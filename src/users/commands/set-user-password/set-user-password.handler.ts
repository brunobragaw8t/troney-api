import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SetUserPasswordCommand } from './set-user-password.command';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { UserPasswordChangedEvent } from 'src/users/events/user-password-changed/user-password-changed.event';

@Injectable()
@CommandHandler(SetUserPasswordCommand)
export class SetUserPasswordHandler
  implements ICommandHandler<SetUserPasswordCommand, UserResponseDto>
{
  constructor(
    private readonly service: UsersService,
    private readonly repo: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SetUserPasswordCommand): Promise<UserResponseDto> {
    const hash = await this.service.hashPassword(command.password);

    const user = await this.repo.update(command.id, { password: hash });

    if (user === null) {
      throw new InternalServerErrorException('Could not set user password');
    }

    const responseDto = this.service.mapToResponseDto(user);

    this.eventBus.publish<UserPasswordChangedEvent>(
      new UserPasswordChangedEvent(responseDto),
    );

    return responseDto;
  }
}
