import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActivationTokenCommand } from './create-activation-token.command';
import { ActivationTokenResponseDto } from 'src/activation-tokens/dto/common/activation-token-response.dto';
import { ActivationTokensRepository } from 'src/activation-tokens/activation-tokens.repository';
import { ActivationTokensService } from 'src/activation-tokens/activation-tokens.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateActivationTokenCommand)
export class CreateActivationTokenHandler
  implements
    ICommandHandler<CreateActivationTokenCommand, ActivationTokenResponseDto>
{
  constructor(
    private readonly repo: ActivationTokensRepository,
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

    console.log('1 token', token);

    return this.service.mapToResponseDto(token);
  }
}
