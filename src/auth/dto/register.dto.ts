import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly repassword: string;

  @IsString()
  readonly name: string;
}
