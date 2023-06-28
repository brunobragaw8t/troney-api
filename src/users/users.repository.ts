import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { GetUserByEmailQuery } from './commands/get-user-by-email/get-user-by-email.query';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(command: CreateUserCommand): Promise<User> {
    return await this.userModel.create(command);
  }

  async findByEmail(query: GetUserByEmailQuery): Promise<User> {
    return await this.userModel.findOne({ email: query.email }).exec();
  }
}
