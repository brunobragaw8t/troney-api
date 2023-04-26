import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto, user: UserDto) {
    return await new this.walletModel({
      ...createWalletDto,
      userId: user.sub,
    }).save();
  }

  async find(id: string, user: UserDto) {
    return await this.walletModel.findOne({ _id: id, userId: user.sub }).exec();
  }

  async findAll(user: UserDto) {
    return await this.walletModel.find({ userId: user.sub }).exec();
  }

  async delete(id: string) {
    return await this.walletModel.findByIdAndDelete(id).exec();
  }
}
