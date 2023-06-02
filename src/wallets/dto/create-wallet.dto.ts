import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly startingBalance: number;

  @IsMongoId()
  @IsNotEmpty()
  readonly user: string;
}
