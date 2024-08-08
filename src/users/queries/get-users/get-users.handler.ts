import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersService } from '../../users.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler
  implements IQueryHandler<GetUsersQuery, UserResponseDto[]>
{
  constructor(
    private readonly repo: UsersRepository,
    private readonly service: UsersService,
  ) {}

  async execute(query: GetUsersQuery): Promise<UserResponseDto[]> {
    const users = await this.repo.findAll(query.filter);
    return users.map((u) => this.service.mapToResponseDto(u));
  }
}
