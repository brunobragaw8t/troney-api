import { UserResponseDto } from 'src/users/dto/common/user-response.dto';

export class IssueAuthTokenCommand {
  constructor(public readonly user: UserResponseDto) {}
}
