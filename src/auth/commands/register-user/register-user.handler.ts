import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { User } from 'src/users/entities/user.entity';
import { RegisterUserCommand } from './register-user.command';
import * as bcrypt from 'bcrypt';
import { CreateUserCommand } from 'src/users/commands/create-user/create-user.command';
import { GetUserByEmailQuery } from 'src/users/commands/get-user-by-email/get-user-by-email.query';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    if (command.password !== command.repassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    const user = await this.queryBus.execute<GetUserByEmailQuery, User>(
      new GetUserByEmailQuery(command.email),
    );

    if (user) {
      throw new ConflictException('Email address is already registered.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(command.password, salt);

    return await this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand(command.email, hash, command.name),
    );
  }
}
