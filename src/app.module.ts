import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { User } from './users/aggregate/user.entity';
import { ActivationTokensModule } from './activation-tokens/activation-tokens.module';
import { ActivationToken } from './activation-tokens/aggregate/activation-token.entity';
import { MailerModule } from './mailer/mailer.module';
import { RecoveryTokensModule } from './recovery-tokens/recovery-tokens.module';
import { RecoveryToken } from './recovery-tokens/aggregate/recovery-token.entity';
import { WalletsModule } from './wallets/wallets.module';
import { Wallet } from './wallets/aggregate/wallet.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        BASE_URL: Joi.string().uri().required(),
        FRONTEND_BASE_URL: Joi.string().uri().required(),
        DB_HOST: Joi.string().hostname().required(),
        DB_PORT: Joi.number().port().default(3306),
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string().empty(''),
        DB_SYNCHRONIZE: Joi.string().valid('true', 'false').required(),
        SMTP_HOST: Joi.string().hostname().required(),
        SMTP_PORT: Joi.number().port().default(587),
        SMTP_SECURE: Joi.string().valid('true', 'false').required(),
        SMTP_AUTH_USER: Joi.string().required(),
        SMTP_AUTH_PASS: Joi.string().required(),
        SMTP_FROM_NAME: Joi.string().required(),
        SMTP_FROM_EMAIL: Joi.string().email().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        synchronize: 'true' === configService.get<string>('DB_SYNCHRONIZE'),
        entities: [User, ActivationToken, RecoveryToken, Wallet],
      }),
    }),
    UsersModule,
    AuthModule,
    ActivationTokensModule,
    RecoveryTokensModule,
    MailerModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
