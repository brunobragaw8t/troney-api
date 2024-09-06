import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryToken } from './aggregate/recovery-token.entity';
import { CreateRecoveryTokenHandler } from './commands/create-recovery-token/create-recovery-token.handler';
import { RecoveryTokensService } from './recovery-tokens.service';
import { RecoveryTokensRepository } from './recovery-tokens.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([RecoveryToken]),
    ConfigModule,
  ],
  providers: [
    CreateRecoveryTokenHandler,
    RecoveryTokensService,
    RecoveryTokensRepository,
  ],
})
export class RecoveryTokensModule {}
