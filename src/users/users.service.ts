import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './aggregate/user.entity';
import { Repository } from 'typeorm';
import { FindAllUsersFilter } from './types/find-all-users-filter.type';
import { UserResponseDto } from './dto/common/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  /**
   * Map User entity to response DTO
   *
   * @param user User entity
   *
   * @returns User's response DTO
   */
  mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async findAll(filter?: FindAllUsersFilter): Promise<User[]> {
    return await this.repo.find({ where: filter });
  }
}
