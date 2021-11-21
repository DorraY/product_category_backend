import { CreateProductDto } from "../dto/create-product.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../models/category";
import { Model } from "mongoose";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>) {}


  async getCategories() {
    try {
      return await this.CategoryModel.find();
    } catch (error) {
      console.log('Error getting categories')
      return [];
    }
  }

  async addCategory(createCategoryDto:CreateCategoryDto) {
    try {
      return await this.CategoryModel.create(createCategoryDto);
    } catch (error) {
      console.log('Error adding category')
      return [];
    }
  }

}
