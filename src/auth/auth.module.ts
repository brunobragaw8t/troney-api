import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CqrsModule, UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
