import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiNoContentResponse,
  ApiConflictResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a user' })
  @ApiNoContentResponse({ description: 'Successful registration' })
  @ApiConflictResponse({ description: 'Email already registered' })
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerUser(@Body() body: RegisterUserDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
