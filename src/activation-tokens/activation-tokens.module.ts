import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationToken } from './aggregate/activation-token.entity';
import { CreateActivationTokenHandler } from './commands/create-activation-token/create-activation-token.handler';
import { ActivationTokensRepository } from './activation-tokens.repository';
import { ActivationTokensService } from './activation-tokens.service';
import { CreateAndSendActivationTokenOnUserCreationHandler } from './events/create-and-send-activation-token-on-user-creation.handler';
import { ConfigModule } from '@nestjs/config';
import { GetActivationTokenHandler } from './queries/get-activation-token/get-activation-token.handler';
import { GetActivationTokenByUserHandler } from './queries/get-activation-token-by-user/get-activation-token-by-user.handler';
import { DeleteActivationTokenHandler } from './commands/delete-activation-token/delete-activation-token.handler';

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
    GetActivationTokenHandler,
    CreateAndSendActivationTokenOnUserCreationHandler,
    GetActivationTokenByUserHandler,
    DeleteActivationTokenHandler,
  ],
})
export class ActivationTokensModule {}
