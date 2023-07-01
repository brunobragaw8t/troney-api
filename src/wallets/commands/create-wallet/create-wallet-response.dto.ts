import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletResponseDto {
  @ApiProperty({ description: 'Wallet ID' })
  readonly id: string;

  @ApiProperty({ description: 'Wallet name' })
  readonly name: string;

  @ApiProperty({ description: 'Wallet starting balance' })
  readonly startingBalance: number;
}
