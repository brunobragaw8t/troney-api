import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersService } from '../../users.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, UserResponseDto>
{
  constructor(
    private readonly repo: UsersRepository,
    private readonly service: UsersService,
  ) {}

  async execute(query: GetUserQuery): Promise<UserResponseDto> {
    const user = await this.repo.find(query.id);

    if (user === null) {
      throw new NotFoundException(`Could not find user.`);
    }

    return this.service.mapToResponseDto(user);
  }
}
