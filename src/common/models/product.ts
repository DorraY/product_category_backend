
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from "./category";

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true
})
export class Product {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop({ required: true })
  image: string;




}

export const ProductSchema = SchemaFactory.createForClass(
  Product,
);
