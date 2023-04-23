import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly startingBalance: number;
}
