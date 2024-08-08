import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './aggregate/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { GetUsersHandler } from './queries/get-users/get-users.handler';
import { UsersRepository } from './users.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepository,
    UsersService,
    CreateUserHandler,
    GetUsersHandler,
  ],
})
export class UsersModule {}
