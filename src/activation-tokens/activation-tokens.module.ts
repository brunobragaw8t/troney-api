import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationToken } from './aggregate/activation-token.entity';
import { CreateActivationTokenHandler } from './commands/create-activation-token/create-activation-token.handler';
import { ActivationTokensRepository } from './activation-tokens.repository';
import { ActivationTokensService } from './activation-tokens.service';
import { CreateAndSendActivationTokenOnUserCreationHandler } from './events/create-and-send-activation-token-on-user-creation.handler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ActivationToken]),
    ConfigModule,
  ],
  providers: [
    ActivationTokensRepository,
    ActivationTokensService,
    CreateActivationTokenHandler,
    CreateAndSendActivationTokenOnUserCreationHandler,
  ],
})
export class ActivationTokensModule {}
