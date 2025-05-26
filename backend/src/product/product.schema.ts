import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
  @Prop({ required: true }) img: true;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) attributes: Array<{
    id: number;
    name: string;
    value: Array<{ id: number; value: string | number }>;
  }>;
  @Prop({
    required: true,
    enum: [
      'another',
      'home appliance',
      'furniture',
      'fashion',
      'electronics',
      'vehicle',
    ],
  })
  type: string;
  @Prop({ required: true, enum: ['old', 'new'], default: 'new' }) state: string;
  @Prop()
  sale: number;
  @Prop({ required: true }) brands: string;
  @Prop({ required: true }) shipCode: boolean;
  @Prop({ required: true })
  flashShip: boolean;
  @Prop({ required: true }) freeShip: boolean;
  @Prop({ required: true }) purchaseQuantity: number;
  @Prop({ required: true }) totalQuantity: number;
  @Prop() createAt: Date;
  @Prop() updateAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
