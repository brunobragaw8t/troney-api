import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRecoveryTokenQuery } from './get-recovery-token.query';
import { RecoveryTokenResponseDto } from 'src/recovery-tokens/dto/common/recovery-token-response.dto';
import { RecoveryTokensRepository } from 'src/recovery-tokens/recovery-tokens.repository';
import { RecoveryTokensService } from 'src/recovery-tokens/recovery-tokens.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
@QueryHandler(GetRecoveryTokenQuery)
export class GetRecoverTokenHandler
  implements IQueryHandler<GetRecoveryTokenQuery, RecoveryTokenResponseDto>
{
  constructor(
    private readonly repo: RecoveryTokensRepository,
    private readonly service: RecoveryTokensService,
    private readonly configService: ConfigService,
  ) {}
  async execute(
    query: GetRecoveryTokenQuery,
  ): Promise<RecoveryTokenResponseDto> {
    const token = await this.repo.find(query.id);

    if (token === null) {
      throw new NotFoundException(`Could not find recovery token ${query.id}`);
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const link = this.service.formLink(token.id, frontendBaseUrl || '');

    return this.service.mapToResponseDto(token, link);
  }
}
