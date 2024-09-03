import { ApiProperty } from '@nestjs/swagger';

export class IssueAuthTokenResponseDto {
  @ApiProperty({ description: 'Auth token' })
  readonly token: string;
}
