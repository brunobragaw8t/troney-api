import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetToken } from './aggregate/reset-token.entity';
import { CreateResetTokenHandler } from './commands/create-reset-token/create-reset-token.handler';
import { ResetTokensService } from './reset-tokens.service';
import { ResetTokensRepository } from './reset-tokens.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ResetToken]), ConfigModule],
  providers: [
    CreateResetTokenHandler,
    ResetTokensService,
    ResetTokensRepository,
  ],
})
export class ResetTokensModule {}
