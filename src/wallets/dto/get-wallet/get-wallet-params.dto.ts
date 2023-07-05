import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetWalletParamsDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;
}
