import { ApiProperty } from '@nestjs/swagger';

export class ActivationTokenResponseDto {
  @ApiProperty({ description: 'ID' })
  readonly id: string;

  @ApiProperty({ description: 'User ID' })
  readonly userId: string;

  @ApiProperty({ description: 'Creation timestamp' })
  readonly createdAt: Date;

  @ApiProperty({ description: 'Activation link' })
  readonly activationLink: string;
}
