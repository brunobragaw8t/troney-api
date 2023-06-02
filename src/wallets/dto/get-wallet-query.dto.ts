import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetWalletQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;
}
