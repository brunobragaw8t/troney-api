import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendEmailCommand } from './send-email.command';
import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';

@Injectable()
@CommandHandler(SendEmailCommand)
export class SendEmailHandler
  implements ICommandHandler<SendEmailCommand, any>
{
  constructor(@Inject('transport') private readonly transport: Transporter) {}

  async execute(command: SendEmailCommand): Promise<any> {
    try {
      return await this.transport.sendMail({
        from: '"Troney" <brunobragaw8t@gmail.com>',
        to: command.to,
        subject: command.subject,
        html: command.message,
      });
    } catch (e) {
      return e;
    }
  }
}
