import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler
  implements IQueryHandler<GetUsersQuery, UserResponseDto[]>
{
  constructor(private readonly service: UsersService) {}

  async execute(query: GetUsersQuery): Promise<UserResponseDto[]> {
    return await this.service.findAll(query.filter);
  }
}
