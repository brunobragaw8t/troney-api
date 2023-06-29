import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
