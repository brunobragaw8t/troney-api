import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './aggregate/user.entity';
import { Repository } from 'typeorm';
import { FindAllUsersFilter } from './types/find-all-users-filter.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findAll(filter?: FindAllUsersFilter): Promise<User[]> {
    return await this.repo.find({ where: filter });
  }
}
