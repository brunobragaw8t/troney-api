import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { AuthTokenPayloadDto } from './dto/common/auth-token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Issue JWT
   *
   * @param user User data
   *
   * @returns Token
   */
  async issueToken(user: UserResponseDto): Promise<string> {
    const payload: AuthTokenPayloadDto = {
      email: user.email,
      name: user.name,
    };

    return await this.jwtService.signAsync(payload, {
      issuer: this.configService.get<string>('BASE_URL'),
      subject: user.id,
      audience: this.configService.get<string>('BASE_URL'),
      expiresIn: '1h',
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
