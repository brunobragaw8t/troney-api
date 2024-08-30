import { ApiProperty } from '@nestjs/swagger';

export class ResetTokenResponseDto {
  @ApiProperty({ description: 'ID' })
  readonly id: string;

  @ApiProperty({ description: 'User ID' })
  readonly userId: string;

  @ApiProperty({ description: 'Creation timestamp' })
  readonly createdAt: Date;

  @ApiProperty({ description: 'Reset link' })
  readonly link: string;
}
