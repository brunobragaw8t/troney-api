import { UserResponseDto } from 'src/users/dto/common/user-response.dto';

export class UserPasswordChangedEvent {
  constructor(public readonly user: UserResponseDto) {}
}
