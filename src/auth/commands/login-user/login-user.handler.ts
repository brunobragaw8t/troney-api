import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response.dto';
import { GetUserByEmailQuery } from 'src/users/commands/get-user-by-email/get-user-by-email.query';
import { User } from 'src/users/entities/user.entity';
import { LoginUserCommand } from './login-user.command';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<LoginUserResponseDto> {
    const user = await this.queryBus.execute<GetUserByEmailQuery, User>(
      new GetUserByEmailQuery(command.email),
    );

    if (!user || !(await bcrypt.compare(command.password, user.password))) {
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
