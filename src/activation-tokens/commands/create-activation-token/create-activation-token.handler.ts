import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActivationTokenCommand } from './create-activation-token.command';
import { ActivationTokenResponseDto } from 'src/activation-tokens/dto/common/activation-token-response.dto';
import { ActivationTokensRepository } from 'src/activation-tokens/activation-tokens.repository';
import { ActivationTokensService } from 'src/activation-tokens/activation-tokens.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(CreateActivationTokenCommand)
export class CreateActivationTokenHandler
  implements
    ICommandHandler<CreateActivationTokenCommand, ActivationTokenResponseDto>
{
  constructor(
    private readonly repo: ActivationTokensRepository,
    private readonly configService: ConfigService,
    private readonly service: ActivationTokensService,
  ) {}

  async execute(
    command: CreateActivationTokenCommand,
  ): Promise<ActivationTokenResponseDto> {
    const token = await this.repo.create(command.userId);

    if (token === null) {
      throw new InternalServerErrorException(
        `Could not create activation token`,
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
