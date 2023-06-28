import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { GetUserByEmailHandler } from './commands/get-user-by-email/get-user-by-email.handler';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CreateUserHandler,
    GetUserByEmailHandler,
    UsersRepository,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
