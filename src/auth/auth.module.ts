import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { JwtModule } from '@nestjs/jwt/dist';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { LoginUserHandler } from './commands/login-user/login-user.handler';
import { RegisterUserHandler } from './commands/register-user/register-user.handler';

@Module({
  imports: [UsersModule, JwtModule, CqrsModule],
  controllers: [AuthController],
  providers: [RegisterUserHandler, LoginUserHandler],
})
export class AuthModule {}
