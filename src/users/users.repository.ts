import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './aggregate/user.entity';
import { Repository } from 'typeorm';
import { FindAllUsersFilter } from './types/find-all-users-filter.type';
import { CreateUserDto } from './dto/create-user/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  /**
   * Create user
   *
   * @param dto DTO for user creation
   *
   * @returns User on success, null on failure
   */
  async create(dto: CreateUserDto): Promise<User | null> {
    const res = await this.repo.insert(dto);

    if (res.identifiers.length === 0) {
      return null;
    }

    return await this.find(res.identifiers[0].id);
  }

  /**
   * Find user
   *
   * @param id User's ID
   *
   * @returns User
   */
  async find(id: string): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }

  /**
   * Find all users
   *
   * @param filter (optional) Users' filter
   *
   * @returns Users
   */
  async findAll(filter?: FindAllUsersFilter): Promise<User[]> {
    return await this.repo.find({ where: filter });
  }
}
