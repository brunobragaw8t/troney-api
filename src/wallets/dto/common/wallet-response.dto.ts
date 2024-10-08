import { ApiProperty } from '@nestjs/swagger';

export class WalletResponseDto {
  @ApiProperty({ description: 'ID' })
  readonly id: string;

  @ApiProperty({ description: 'Name' })
  readonly name: string;

  @ApiProperty({ description: 'Balance' })
  readonly balance: number;

  @ApiProperty({ description: 'Creation date' })
  readonly createdAt: Date;
}
