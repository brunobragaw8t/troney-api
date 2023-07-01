import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CreateWalletHandler } from './commands/create-wallet/create-wallet.handler';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './wallets.repository';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    AuthModule,
    JwtModule,
    CqrsModule,
  ],
  controllers: [WalletsController],
  providers: [CreateWalletHandler, WalletsRepository, WalletsService],
})
export class WalletsModule {}
