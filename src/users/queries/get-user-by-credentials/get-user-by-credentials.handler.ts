import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByCredentialsQuery } from './get-user-by-credentials.query';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
@QueryHandler(GetUserByCredentialsQuery)
export class GetUserByCredentialsHandler
  implements IQueryHandler<GetUserByCredentialsQuery, UserResponseDto>
{
  constructor(
    private readonly repo: UsersRepository,
    private readonly service: UsersService,
  ) {}

  async execute(query: GetUserByCredentialsQuery): Promise<UserResponseDto> {
    const user = await this.repo.findByEmail(query.email);

    if (user === null) {
      throw new NotFoundException('Could not find user.');
    }

    const isCorrectPassword = await this.service.isCorrectPassword(
      query.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Bad credentials.');
    }

    return this.service.mapToResponseDto(user);
  }
}
