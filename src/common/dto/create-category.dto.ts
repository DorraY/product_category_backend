import { IsNotEmpty } from "class-validator";
import { Category } from "../models/category";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

}
