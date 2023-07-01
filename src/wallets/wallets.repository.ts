import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletCommand } from './commands/create-wallet/create-wallet.command';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  async create(command: CreateWalletCommand): Promise<Wallet> {
    return await this.walletModel.create(command);
  }
}
