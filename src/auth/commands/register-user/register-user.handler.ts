import { BadRequestException, ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserCommand } from './register-user.command';
import * as bcrypt from 'bcrypt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(private readonly usersService: UsersService) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    if (command.password !== command.repassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    if (await this.usersService.findByEmail(command.email)) {
      throw new ConflictException('Email address is already registered.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(command.password, salt);

    return await this.usersService.create({
      email: command.email,
      password: hash,
      name: command.name,
    });
  }
}
