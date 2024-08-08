import { Injectable } from '@nestjs/common';
import { User } from './aggregate/user.entity';
import { UserResponseDto } from './dto/common/user-response.dto';

@Injectable()
export class UsersService {
  /**
   * Map User entity to response DTO
   *
   * @param user User entity
   *
   * @returns User's response DTO
   */
  mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
