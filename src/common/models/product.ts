
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
  image: {
    data: Buffer,
    contentType: String
  };

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  expiryDate: Date;




}

export const ProductSchema = SchemaFactory.createForClass(
  Product,
);
