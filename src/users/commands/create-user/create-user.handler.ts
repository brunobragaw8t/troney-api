import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    return await this.usersRepository.create(command);
  }
}
