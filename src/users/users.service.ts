import { Injectable } from '@nestjs/common';
import { User } from './aggregate/user.entity';
import * as bcrypt from 'bcrypt';
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

  /**
   * Hash password
   *
   * @param password Password to hash
   *
   * @returns Hashed password
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  /**
   * Check is password is correct
   *
   * @param password Password to check
   * @param hash Stored password hash
   *
   * @returns True on correct password, false otherwise
   */
  async isCorrectPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
