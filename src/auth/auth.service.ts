import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.repassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    const correspondingUsers = await this.usersService.findAll({
      email: registerDto.email,
    });

    if (0 !== correspondingUsers.length) {
      throw new ConflictException('Email address is already registered.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(registerDto.password, salt);

    return await this.usersService.create({
      email: registerDto.email,
      password: hash,
      name: registerDto.name,
    });
  }

  async login(loginDto: LoginDto) {
    const correspondingUsers = await this.usersService.findAll({
      email: loginDto.email,
    });

    if (
      0 === correspondingUsers.length ||
      !(await bcrypt.compare(loginDto.password, correspondingUsers[0].password))
    ) {
      throw new UnauthorizedException('Incorrect email and/or password');
    }

    return {
      accessToken: await this.jwtService.signAsync(
        {
          sub: correspondingUsers[0]._id,
          email: correspondingUsers[0].email,
          name: correspondingUsers[0].name,
        },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      ),
    };
  }
}
