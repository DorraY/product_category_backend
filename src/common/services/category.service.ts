import { CreateProductDto } from "../dto/create-product.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../models/category";
import { Model } from "mongoose";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>) {}


  async getCategories() {
    try {
      return await this.CategoryModel.find();
    } catch (error) {
      console.log(error)
      console.log('Error getting categories')
      return {error:true};
    }
  }
  async addCategory(createCategoryDto:CreateCategoryDto) {
    try {
      return await this.CategoryModel.create(createCategoryDto);
    } catch (error) {
      console.log('Error adding category')
      return {error:true};
    }
  }

  async updateCategory(id:String,updateCategoryDto: UpdateCategoryDto) {
    try {
      let categoryToUpdate = await this.CategoryModel.findById({_id:id});
      if (updateCategoryDto?.title===''||updateCategoryDto?.title===undefined) {
        return await categoryToUpdate.save();
      }
      categoryToUpdate.title = updateCategoryDto?.title;
      return await categoryToUpdate.save();
    } catch (error) {
      console.log('Error update category');
      return {error:false};
    }
  }

  async deleteCategory(id: string) {
    try {
      let categoryToDelete = await this.CategoryModel.findById({ _id:id });
      if (categoryToDelete === null) {
        return false;
      }
      else {
        return await this.CategoryModel.deleteOne({ _id: id });

      }
    } catch (e) {
      console.log("Error deleting product")
      return {error:true}
    }
  }

}
