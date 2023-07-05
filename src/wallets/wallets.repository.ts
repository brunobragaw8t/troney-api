import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletCommand } from './commands/create-wallet/create-wallet.command';
import { Wallet } from './entities/wallet.entity';
import { GetWalletQuery } from './queries/get-wallet/get-wallet.query';
import { GetWalletsQuery } from './queries/get-wallets/get-wallets.query';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  async create(command: CreateWalletCommand): Promise<Wallet> {
    return await this.walletModel.create(command);
  }

  async findAll(query: GetWalletsQuery): Promise<Wallet[]> {
    return await this.walletModel.find({ user: query.userId });
  }

  async find(query: GetWalletQuery): Promise<Wallet> {
    return await this.walletModel.findOne({
      _id: query.id,
      user: query.userId,
    });
  }
}
