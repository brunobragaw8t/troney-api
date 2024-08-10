import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as nodemailer from 'nodemailer';
import { SendEmailHandler } from './commands/send-email/send-email.handler';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, CqrsModule],
  providers: [
    {
      inject: [ConfigService],
      provide: 'transport',
      useFactory: (configService: ConfigService) =>
        nodemailer.createTransport({
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: 'true' === configService.get<string>('SMTP_SECURE'),
          auth: {
            user: configService.get<string>('SMTP_AUTH_USER'),
            pass: configService.get<string>('SMTP_AUTH_PASS'),
          },
        }),
    },
    SendEmailHandler,
  ],
})
export class MailerModule {}
