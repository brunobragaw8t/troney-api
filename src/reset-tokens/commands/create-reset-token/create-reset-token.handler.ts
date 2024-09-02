import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResetTokenCommand } from './create-reset-token.command';
import { ResetTokenResponseDto } from 'src/reset-tokens/dto/common/reset-token-response.dto';
import { ResetTokensRepository } from 'src/reset-tokens/reset-tokens.repository';
import { ResetTokensService } from 'src/reset-tokens/reset-tokens.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(CreateResetTokenCommand)
export class CreateResetTokenHandler
  implements ICommandHandler<CreateResetTokenCommand, ResetTokenResponseDto>
{
  constructor(
    private readonly repo: ResetTokensRepository,
    private readonly configService: ConfigService,
    private readonly service: ResetTokensService,
  ) {}

  async execute(
    command: CreateResetTokenCommand,
  ): Promise<ResetTokenResponseDto> {
    const token = await this.repo.create(command.userId);

    if (token === null) {
      throw new InternalServerErrorException(`Could not create reset token`);
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const link = this.service.formLink(token.id, frontendBaseUrl || '');

    return this.service.mapToResponseDto(token, link);
  }
}
