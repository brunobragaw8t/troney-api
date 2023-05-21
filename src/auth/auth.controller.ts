import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() body: RegisterUserDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
