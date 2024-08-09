import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationToken } from './aggregate/activation-token.entity';
import { CreateActivationTokenHandler } from './commands/create-activation-token/create-activation-token.handler';
import { ActivationTokensRepository } from './activation-tokens.repository';
import { ActivationTokensService } from './activation-tokens.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ActivationToken])],
  providers: [
    ActivationTokensRepository,
    ActivationTokensService,
    CreateActivationTokenHandler,
  ],
})
export class ActivationTokensModule {}
