import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoveryToken } from './aggregate/recovery-token.entity';
import { CreateRecoveryTokenHandler } from './commands/create-recovery-token/create-recovery-token.handler';
import { RecoveryTokensService } from './recovery-tokens.service';
import { RecoveryTokensRepository } from './recovery-tokens.repository';
import { GetRecoverTokenHandler } from './queries/get-recovery-token/get-recovery-token.handler';
import { DeleteRecoveryTokenHandler } from './commands/delete-recovery-token/delete-recovery-token.handler';

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
    GetRecoverTokenHandler,
    DeleteRecoveryTokenHandler,
  ],
})
export class RecoveryTokensModule {}
