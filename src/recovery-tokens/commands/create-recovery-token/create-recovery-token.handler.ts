import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRecoveryTokenCommand } from './create-recovery-token.command';
import { RecoveryTokenResponseDto } from 'src/recovery-tokens/dto/common/recovery-token-response.dto';
import { RecoveryTokensRepository } from 'src/recovery-tokens/recovery-tokens.repository';
import { RecoveryTokensService } from 'src/recovery-tokens/recovery-tokens.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(CreateRecoveryTokenCommand)
export class CreateRecoveryTokenHandler
  implements
    ICommandHandler<CreateRecoveryTokenCommand, RecoveryTokenResponseDto>
{
  constructor(
    private readonly repo: RecoveryTokensRepository,
    private readonly configService: ConfigService,
    private readonly service: RecoveryTokensService,
  ) {}

  async execute(
    command: CreateRecoveryTokenCommand,
  ): Promise<RecoveryTokenResponseDto> {
    const token = await this.repo.create(command.userId);

    if (token === null) {
      throw new InternalServerErrorException(`Could not create recovery token`);
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const link = this.service.formLink(token.id, frontendBaseUrl || '');

    return this.service.mapToResponseDto(token, link);
  }
}
