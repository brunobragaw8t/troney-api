import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Wallet extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  startingBalance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
