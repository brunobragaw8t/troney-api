import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendEmailCommand } from './send-email.command';
import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(SendEmailCommand)
export class SendEmailHandler
  implements ICommandHandler<SendEmailCommand, any>
{
  constructor(
    @Inject('transport') private readonly transport: Transporter,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: SendEmailCommand): Promise<any> {
    const fromName = this.configService.get<string>('SMTP_FROM_NAME');
    const fromEmail = this.configService.get<string>('SMTP_FROM_EMAIL');

    try {
      return await this.transport.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: command.to,
        subject: command.subject,
        html: command.message,
      });
    } catch (e) {
      return e;
    }
  }
}
