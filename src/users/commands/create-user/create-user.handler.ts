import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersService } from 'src/users/users.service';
import { InternalServerErrorException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserResponseDto>
{
  constructor(
    private readonly repo: UsersRepository,
    private readonly service: UsersService,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserResponseDto> {
    const hash = await this.service.hashPassword(command.password);

    const user = await this.repo.create({
      email: command.email,
      password: hash,
      name: command.name,
    });

    if (user === null) {
      throw new InternalServerErrorException(`Could not create user.`);
    }

    return this.service.mapToResponseDto(user);
  }
}
