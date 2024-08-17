import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ActivateUserCommand } from './activate-user.command';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
@CommandHandler(ActivateUserCommand)
export class ActivateUserHandler
  implements ICommandHandler<ActivateUserCommand, UserResponseDto>
{
  constructor(
    private readonly service: UsersService,
    private readonly repo: UsersRepository,
  ) {}

  async execute(command: ActivateUserCommand): Promise<UserResponseDto> {
    const user = await this.repo.update(command.userId, {
      activatedAt: new Date(),
    });

    if (user === null) {
      throw new NotFoundException(`User not found.`);
    }

    return this.service.mapToResponseDto(user);
  }
}
