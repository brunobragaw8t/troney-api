import { Injectable } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/users/events/user-created/user-created.event';
import { CreateActivationTokenCommand } from '../commands/create-activation-token/create-activation-token.command';
import { ActivationTokenResponseDto } from '../dto/common/activation-token-response.dto';
import { SendEmailCommand } from 'src/mailer/commands/send-email/send-email.command';
import { ConfigService } from '@nestjs/config';

@Injectable()
@EventsHandler(UserCreatedEvent)
export class CreateAndSendActivationTokenOnUserCreationHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: UserCreatedEvent) {
    console.log('reached event handler', event);

    const activationToken = await this.commandBus.execute<
      CreateActivationTokenCommand,
      ActivationTokenResponseDto
    >(new CreateActivationTokenCommand(event.user.id));

    const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');
    const activationLink = `${frontendBaseUrl}/activate?t=${activationToken.id}`;

    await this.commandBus.execute<SendEmailCommand>(
      new SendEmailCommand(
        event.user.email,
        'Troney | Activate your account',
        `Hi, ${event.user.name}.<br />
        Your account was successfully created. Please click the following link to active it:<br />
        <br />
        <a href="${activationLink}">${activationLink}</a>`,
      ),
    );
  }
}
