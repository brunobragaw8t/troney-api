import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Wallet extends mongoose.Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  startingBalance: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
