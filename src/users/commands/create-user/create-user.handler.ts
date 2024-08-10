import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersService } from 'src/users/users.service';
import { InternalServerErrorException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UserCreatedEvent } from 'src/users/events/user-created/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserResponseDto>
{
  constructor(
    private readonly repo: UsersRepository,
    private readonly service: UsersService,
    private readonly eventBus: EventBus,
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

    const responseDto = this.service.mapToResponseDto(user);

    this.eventBus.publish<UserCreatedEvent>(new UserCreatedEvent(responseDto));

    return responseDto;
  }
}
