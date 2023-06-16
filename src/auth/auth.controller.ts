import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiNoContentResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserCommand } from './commands/register-user/register-user.command';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register a user' })
  @ApiNoContentResponse({ description: 'Successful registration' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiConflictResponse({ description: 'Email already registered' })
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerUser(@Body() body: RegisterUserDto): Promise<User> {
    return await this.commandBus.execute<RegisterUserCommand, User>(
      new RegisterUserCommand(
        body.email,
        body.password,
        body.repassword,
        body.name,
      ),
    );
  }

  @ApiOperation({ summary: 'Send login request' })
  @ApiUnauthorizedResponse({ description: 'Incorrect email and/or password' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() body: LoginUserDto) {
    return await this.authService.loginUser(body);
  }
}
