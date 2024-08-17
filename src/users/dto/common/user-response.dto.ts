import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'ID' })
  readonly id: string;

  @ApiProperty({ description: 'Email' })
  readonly email: string;

  @ApiProperty({ description: 'Name' })
  readonly name: string;

  @ApiProperty({ description: 'Account activation date' })
  readonly activatedAt: Date | null;
}
