import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'Wallet name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Wallet starting balance' })
  @IsNumber()
  @IsNotEmpty()
  readonly startingBalance: number;
}
