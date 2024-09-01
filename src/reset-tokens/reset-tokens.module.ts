import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetToken } from './aggregate/reset-token.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ResetToken]), ConfigModule],
  providers: [],
})
export class ResetTokensModule {}
