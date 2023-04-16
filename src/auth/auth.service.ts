import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
}
