import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Wallet extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  startingBalance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
