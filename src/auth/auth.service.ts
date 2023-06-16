import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserPayloadDto } from './dto/user-payload.dto';
import { LoginUserResponseDto } from './dto/login-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(body: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.usersService.findByEmail(body.email);

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Incorrect email and/or password');
    }

    const payload: UserPayloadDto = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
        subject: user._id.toString(),
      }),
    };
  }
}
