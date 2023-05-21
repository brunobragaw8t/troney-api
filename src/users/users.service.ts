import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(usersQueryDto: UsersQueryDto) {
    const query = this.userModel.find();

    if (usersQueryDto.email) {
      query.where('email').equals(usersQueryDto.email);
    }

    return await query.exec();
  }

  async create(createUserDto: CreateUserDto) {
    return await new this.userModel(createUserDto).save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
