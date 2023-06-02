import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  async create(body: CreateWalletDto): Promise<Wallet> {
    return await this.walletModel.create(body);
  }

  async find(id: string, user: UserDto) {
    return await this.walletModel.findOne({ _id: id, userId: user.sub }).exec();
  }

  async findAll(user: UserDto) {
    return await this.walletModel.find({ userId: user.sub }).exec();
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.walletModel
      .findOneAndUpdate({ _id: id }, { $set: updateWalletDto }, { new: true })
      .exec();

    if (!wallet) {
      throw new NotFoundException();
    }

    return wallet;
  }

  async delete(id: string) {
    return await this.walletModel.findByIdAndDelete(id).exec();
  }
}
