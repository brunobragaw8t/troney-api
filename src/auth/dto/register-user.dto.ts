import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'Email of user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of user' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'Password confirmation' })
  @IsString()
  readonly repassword: string;

  @ApiProperty({ description: 'Name of user' })
  @IsString()
  readonly name: string;
}
