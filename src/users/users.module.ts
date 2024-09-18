import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './aggregate/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { GetUsersHandler } from './queries/get-users/get-users.handler';
import { UsersRepository } from './users.repository';
import { GetUserHandler } from './queries/get-user/get-user.handler';
import { ActivateUserHandler } from './commands/activate-user/activate-user.handler';
import { GetUserByCredentialsHandler } from './queries/get-user-by-credentials/get-user-by-credentials.handler';
import { SetUserPasswordHandler } from './commands/set-user-password/set-user-password.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepository,
    UsersService,
    CreateUserHandler,
    GetUsersHandler,
    GetUserHandler,
    GetUserByCredentialsHandler,
    ActivateUserHandler,
    SetUserPasswordHandler,
  ],
})
export class UsersModule {}
