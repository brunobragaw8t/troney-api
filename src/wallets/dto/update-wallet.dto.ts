import { IsNumber, IsString } from 'class-validator';

export class UpdateWalletDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly startingBalance: number;
}
