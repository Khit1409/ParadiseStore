import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) phone: string;
  @Prop() avt: string;
  @Prop() address: string;
  @Prop({
    required: true,
    enum: ['male', 'female', 'unknow'],
    default: 'unknow',
  })
  gender: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true, enum: ['user', 'seller', 'admin'], default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
