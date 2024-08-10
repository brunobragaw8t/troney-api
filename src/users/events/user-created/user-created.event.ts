import { UserResponseDto } from 'src/users/dto/common/user-response.dto';

export class UserCreatedEvent {
  constructor(public readonly user: UserResponseDto) {}
}
