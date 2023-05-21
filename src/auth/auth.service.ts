import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(body: RegisterUserDto): Promise<User> {
    if (body.password !== body.repassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    if (await this.usersService.findByEmail(body.email)) {
      throw new ConflictException('Email address is already registered.');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(body.password, salt);

    return await this.usersService.create({
      email: body.email,
      password: hash,
      name: body.name,
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

    const payload: UserDto = {
      sub: correspondingUsers[0]._id,
      email: correspondingUsers[0].email,
      name: correspondingUsers[0].name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
    };
  }
}
