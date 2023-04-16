import { IsOptional, IsString } from 'class-validator';

export class UsersQueryDto {
  @IsOptional()
  @IsString()
  readonly email?: string;
}
