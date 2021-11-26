import { IsNotEmpty } from "class-validator";
import { Category } from "../models/category";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  expiryDate: Date;
  @IsNotEmpty()
  category: Category;
  @IsNotEmpty()
  price: number;
}
