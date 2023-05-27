import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'Email of user' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of user' })
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty({ description: 'Password confirmation' })
  @IsStrongPassword()
  readonly repassword: string;

  @ApiProperty({ description: 'Name of user' })
  @IsString()
  readonly name: string;
}
