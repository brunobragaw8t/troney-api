import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRecoveryTokenCommand } from './delete-recovery-token.command';
import { RecoveryTokenResponseDto } from 'src/recovery-tokens/dto/common/recovery-token-response.dto';
import { RecoveryTokensRepository } from 'src/recovery-tokens/recovery-tokens.repository';
import { RecoveryTokensService } from 'src/recovery-tokens/recovery-tokens.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(DeleteRecoveryTokenCommand)
export class DeleteRecoveryTokenHandler
  implements
    ICommandHandler<DeleteRecoveryTokenCommand, RecoveryTokenResponseDto>
{
  constructor(
    private readonly repo: RecoveryTokensRepository,
    private readonly configService: ConfigService,
    private readonly service: RecoveryTokensService,
  ) {}

  async execute(
    command: DeleteRecoveryTokenCommand,
  ): Promise<RecoveryTokenResponseDto> {
    const token = await this.repo.delete(command.id);

    if (token === null) {
      throw new InternalServerErrorException('Could not delete recovery token');
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const link = this.service.formLink(token.id, frontendBaseUrl || '');

    return this.service.mapToResponseDto(token, link);
  }
}
