import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserByEmailQuery): Promise<User> {
    return await this.usersRepository.findByEmail(query);
  }
}
