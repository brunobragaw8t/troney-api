import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetActivationTokenByUserQuery } from './get-activation-token-by-user.query';
import { ActivationTokenResponseDto } from 'src/activation-tokens/dto/common/activation-token-response.dto';
import { ActivationTokensRepository } from 'src/activation-tokens/activation-tokens.repository';
import { ActivationTokensService } from 'src/activation-tokens/activation-tokens.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
@QueryHandler(GetActivationTokenByUserQuery)
export class GetActivationTokenByUserHandler
  implements
    IQueryHandler<GetActivationTokenByUserQuery, ActivationTokenResponseDto>
{
  constructor(
    private readonly repo: ActivationTokensRepository,
    private readonly service: ActivationTokensService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    query: GetActivationTokenByUserQuery,
  ): Promise<ActivationTokenResponseDto> {
    const token = await this.repo.findByUser(query.userId);

    if (token === null) {
      throw new NotFoundException(`Could not find activation token for user`);
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const activationLink = this.service.formActivationLink(
      token.id,
      frontendBaseUrl || '',
    );

    return this.service.mapToResponseDto(token, activationLink);
  }
}
