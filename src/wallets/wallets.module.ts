import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './aggregate/wallet.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletsController],
})
export class WalletsModule {}
