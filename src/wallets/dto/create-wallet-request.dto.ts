import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly startingBalance: number;
}
