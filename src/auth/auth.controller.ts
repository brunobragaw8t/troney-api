import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { GetUsersQuery } from '../users/queries/get-users/get-users.query';
import { RegisterDto } from './dto/register/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from '../users/commands/create-user/create-user.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<UserResponseDto> {
    const users = await this.queryBus.execute<GetUsersQuery, UserResponseDto[]>(
      new GetUsersQuery({ email: body.email }),
    );

    if (users.length > 0) {
      throw new ConflictException(`Email already registered.`);
    }

    return this.commandBus.execute<CreateUserCommand, UserResponseDto>(
      new CreateUserCommand(body.email, body.password, body.name),
    );
  }
}
