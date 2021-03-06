
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true
})
export class Category {
  @Prop({ required: true })
  title: string;


}

export const CategorySchema = SchemaFactory.createForClass(
  Category,
);
