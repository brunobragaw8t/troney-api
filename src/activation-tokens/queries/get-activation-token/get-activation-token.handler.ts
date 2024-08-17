import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetActivationTokenQuery } from './get-activation-token.query';
import { ActivationTokenResponseDto } from 'src/activation-tokens/dto/common/activation-token-response.dto';
import { ActivationTokensRepository } from 'src/activation-tokens/activation-tokens.repository';
import { ActivationTokensService } from 'src/activation-tokens/activation-tokens.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
@QueryHandler(GetActivationTokenQuery)
export class GetActivationTokenHandler
  implements IQueryHandler<GetActivationTokenQuery, ActivationTokenResponseDto>
{
  constructor(
    private readonly repo: ActivationTokensRepository,
    private readonly service: ActivationTokensService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    query: GetActivationTokenQuery,
  ): Promise<ActivationTokenResponseDto> {
    const token = await this.repo.find(query.id);

    if (token === null) {
      throw new NotFoundException(
        `Could not find activation token ${query.id}`,
      );
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const activationLink = this.service.formActivationLink(
      token.id,
      frontendBaseUrl || '',
    );

    return this.service.mapToResponseDto(token, activationLink);
  }
}
