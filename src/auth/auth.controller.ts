import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserResponseDto } from 'src/users/dto/common/user-response.dto';
import { GetUsersQuery } from '../users/queries/get-users/get-users.query';
import { RegisterDto } from './dto/register/register.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserCommand } from '../users/commands/create-user/create-user.command';
import { ActivateUserDto } from './dto/activate-user/activate-user.dto';
import { GetActivationTokenQuery } from 'src/activation-tokens/queries/get-activation-token/get-activation-token.query';
import { ActivationTokenResponseDto } from 'src/activation-tokens/dto/common/activation-token-response.dto';
import { GetUserQuery } from 'src/users/queries/get-user/get-user.query';
import { ActivateUserCommand } from 'src/users/commands/activate-user/activate-user.command';
import { ResendActivationEmailDto } from './dto/resend-activation-email/resend-activation-email.dto';
import { SendEmailCommand } from 'src/mailer/commands/send-email/send-email.command';
import { GetActivationTokenByUserQuery } from 'src/activation-tokens/queries/get-activation-token-by-user/get-activation-token-by-user.query';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiConflictResponse({ description: 'Email already registered' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: UserResponseDto,
  })
  async register(@Body() body: RegisterDto): Promise<UserResponseDto> {
    const users = await this.queryBus.execute<GetUsersQuery, UserResponseDto[]>(
      new GetUsersQuery({ email: body.email }),
    );

    if (users.length > 0) {
      throw new ConflictException(`Email already registered.`);
    }

    return await this.commandBus.execute<CreateUserCommand, UserResponseDto>(
      new CreateUserCommand(body.email, body.password, body.name),
    );
  }

  @Post('activate')
  @ApiOperation({ summary: 'Activate user' })
  @ApiNotFoundResponse({ description: 'Activation token not found' })
  @ApiConflictResponse({ description: 'User already activated' })
  @ApiOkResponse({ description: 'User activated successfully' })
  @HttpCode(HttpStatus.OK)
  async activateUser(@Body() body: ActivateUserDto): Promise<any> {
    const token = await this.queryBus.execute<
      GetActivationTokenQuery,
      ActivationTokenResponseDto
    >(new GetActivationTokenQuery(body.token));

    const user = await this.queryBus.execute<GetUserQuery, UserResponseDto>(
      new GetUserQuery(token.userId),
    );

    if (user.activatedAt !== null) {
      throw new ConflictException(`User already activated.`);
    }

    return await this.commandBus.execute<ActivateUserCommand, UserResponseDto>(
      new ActivateUserCommand(user.id),
    );
  }

  @Post('resend-activation')
  @ApiOperation({ summary: 'Resend activation email' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'User already activated' })
  @ApiOkResponse({ description: 'Email sent successfully' })
  @HttpCode(HttpStatus.OK)
  async resendActivationEmail(
    @Body() body: ResendActivationEmailDto,
  ): Promise<void> {
    const users = await this.queryBus.execute<GetUsersQuery, UserResponseDto[]>(
      new GetUsersQuery({ email: body.email }),
    );

    if (users.length === 0) {
      throw new NotFoundException(`User with email ${body.email} not found.`);
    }

    const activationToken = await this.queryBus.execute<
      GetActivationTokenByUserQuery,
      ActivationTokenResponseDto
    >(new GetActivationTokenByUserQuery(users[0].id));

    await this.commandBus.execute<SendEmailCommand>(
      new SendEmailCommand(
        users[0].email,
        'Troney | Activate your account',
        `Hi, ${users[0].name}.<br />
        Your account was successfully created. Please click the following link to active it:<br />
        <br />
        <a href="${activationToken.activationLink}">${activationToken.activationLink}</a>`,
      ),
    );
  }
}
