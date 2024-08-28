import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenPayloadDto {
  @ApiProperty({ description: 'Issuer' })
  readonly email: string;

  @ApiProperty({ description: 'Subject' })
  readonly name: string;
}
