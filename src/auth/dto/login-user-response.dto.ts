import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({ description: 'User access token' })
  readonly accessToken: string;
}
