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
  ApiBadRequestResponse,
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
import { LoginDto } from './dto/login/login.dto';
import { GetUserByCredentialsQuery } from 'src/users/queries/get-user-by-credentials/get-user-by-credentials.query';
import { LoginResponseDto } from './dto/login/login-response.dto';
import { IssueAuthTokenCommand } from './commands/issue-auth-token.command';
import { IssueAuthTokenResponseDto } from './dto/issue-auth-token/issue-auth-token-response.dto';
import { RecoveryDto } from './dto/recovery/recovery.dto';
import { CreateRecoveryTokenCommand } from 'src/recovery-tokens/commands/create-recovery-token/create-recovery-token.command';
import { RecoveryTokenResponseDto } from 'src/recovery-tokens/dto/common/recovery-token-response.dto';
import { ResetPasswordDto } from './dto/reset-password/reset-password.dto';
import { GetRecoveryTokenQuery } from 'src/recovery-tokens/queries/get-recovery-token/get-recovery-token.query';
import { SetUserPasswordCommand } from 'src/users/commands/set-user-password/set-user-password.command';
import { DeleteActivationTokenCommand } from 'src/activation-tokens/commands/delete-activation-token/delete-activation-token.command';
import { DeleteRecoveryTokenCommand } from 'src/recovery-tokens/commands/delete-recovery-token/delete-recovery-token.command';

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

    const activatedUser = await this.commandBus.execute<
      ActivateUserCommand,
      UserResponseDto
    >(new ActivateUserCommand(user.id));

    this.commandBus.execute<
      DeleteActivationTokenCommand,
      ActivationTokenResponseDto
    >(new DeleteActivationTokenCommand(token.id));

    return activatedUser;
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

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBadRequestResponse({ description: 'Bad credentials' })
  @ApiConflictResponse({ description: 'User not activated' })
  @ApiOkResponse({ description: 'Successful login' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.queryBus.execute<
      GetUserByCredentialsQuery,
      UserResponseDto
    >(new GetUserByCredentialsQuery(body.email, body.password));

    if (user.activatedAt === null) {
      throw new ConflictException(`User not activated`);
    }

    const res = await this.commandBus.execute<
      IssueAuthTokenCommand,
      IssueAuthTokenResponseDto
    >(new IssueAuthTokenCommand(user));

    return {
      token: res.token,
    };
  }

  @Post('recover-password')
  @ApiOperation({ summary: 'Request password recovery' })
  @ApiConflictResponse({ description: 'User not activated' })
  @ApiBadRequestResponse({ description: 'Bad credentials' })
  @ApiOkResponse({ description: 'Email sent successfully' })
  @HttpCode(HttpStatus.OK)
  async recoverPassword(@Body() body: RecoveryDto): Promise<void> {
    const users = await this.queryBus.execute<GetUsersQuery, UserResponseDto[]>(
      new GetUsersQuery({ email: body.email }),
    );

    if (users.length === 0) {
      throw new NotFoundException(`User with email ${body.email} not found.`);
    }

    const token = await this.commandBus.execute<
      CreateRecoveryTokenCommand,
      RecoveryTokenResponseDto
    >(new CreateRecoveryTokenCommand(users[0].id));

    await this.commandBus.execute<SendEmailCommand>(
      new SendEmailCommand(
        users[0].email,
        'Troney | Reset your password',
        `Hi, ${users[0].name}.<br />
        Please click the following link to reset your password:<br />
        <br />
        <a href="${token.link}">${token.link}</a>`,
      ),
    );
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBadRequestResponse({ description: 'Password not strong enough' })
  @ApiNotFoundResponse({ description: 'Recovery token not found' })
  @ApiConflictResponse({ description: 'User not activated' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiOkResponse({ description: 'New password set successfully' })
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<UserResponseDto> {
    const token = await this.queryBus.execute<
      GetRecoveryTokenQuery,
      RecoveryTokenResponseDto
    >(new GetRecoveryTokenQuery(body.token));

    const user = await this.queryBus.execute<GetUserQuery, UserResponseDto>(
      new GetUserQuery(token.userId),
    );

    if (user.activatedAt === null) {
      throw new ConflictException('User not activated.');
    }

    const updatedUser = await this.commandBus.execute<
      SetUserPasswordCommand,
      UserResponseDto
    >(new SetUserPasswordCommand(user.id, body.password));

    this.commandBus.execute<
      DeleteRecoveryTokenCommand,
      RecoveryTokenResponseDto
    >(new DeleteRecoveryTokenCommand(token.id));

    this.commandBus.execute<SendEmailCommand>(
      new SendEmailCommand(
        updatedUser.email,
        'Troney | Password reset',
        `Hi, ${updatedUser.name}.<br />
        Your password was just changed.<br />
        If this wasn't your doing, please reach out to us to fix the issue.`,
      ),
    );

    return updatedUser;
  }
}
