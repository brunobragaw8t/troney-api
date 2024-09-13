import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteActivationTokenCommand } from './delete-activation-token.command';
import { ActivationTokenResponseDto } from 'src/activation-tokens/dto/common/activation-token-response.dto';
import { ActivationTokensRepository } from 'src/activation-tokens/activation-tokens.repository';
import { ActivationTokensService } from 'src/activation-tokens/activation-tokens.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(DeleteActivationTokenCommand)
export class DeleteActivationTokenHandler
  implements
    ICommandHandler<DeleteActivationTokenCommand, ActivationTokenResponseDto>
{
  constructor(
    private readonly repo: ActivationTokensRepository,
    private readonly configService: ConfigService,
    private readonly service: ActivationTokensService,
  ) {}

  async execute(
    command: DeleteActivationTokenCommand,
  ): Promise<ActivationTokenResponseDto> {
    const token = await this.repo.delete(command.id);

    if (token === null) {
      throw new InternalServerErrorException(
        'Could not delete activation token',
      );
    }

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');

    const link = this.service.formActivationLink(
      token.id,
      frontendBaseUrl || '',
    );

    return this.service.mapToResponseDto(token, link);
  }
}
