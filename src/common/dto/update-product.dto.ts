import { Category } from '../models/category';

export class UpdateProductDto {
  name: string;
  expiryDate: Date;
  category: Category;
  price: number;
}
