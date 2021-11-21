import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../models/category";
import { Product, ProductDocument } from "../models/product";
import { CreateProductDto } from "../dto/create-product.dto";

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private readonly ProductModel: Model<ProductDocument>,
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
  ) {
  }

  async getProducts() {
    try {
      return await this.ProductModel.find().populate('Category');
    } catch (error) {
      console.log('Error getting products')
      return [];
    }
  }

  async addProduct(createProductDto:CreateProductDto) {
    try {
      return await this.ProductModel.create(createProductDto);
    } catch (error) {
      console.log('Error adding product')
      return [];
    }
  }

  async updateProduct(id:String,updateProductDto: CreateProductDto) {
    try {
      let productToUpdate = await this.ProductModel.findById(id);
      productToUpdate.name = updateProductDto.name;
      productToUpdate.expiryDate = updateProductDto.expiryDate;
      productToUpdate.category = updateProductDto.category;
      productToUpdate.price = updateProductDto.price;
      //productToUpdate.image = updateProductDto.image;
      await productToUpdate.save();
      return true;
    } catch (error) {
      console.log('Error update product')
      return false;
    }
  }

  async deleteProduct(id: string) {
    try {
      let productToDelete = await this.ProductModel.findById(id);
      if (productToDelete === null) {
        return false;
      }
      else {
        await this.ProductModel.deleteOne({ _id: id });
        return true;
      }
    } catch (e) {
      console.log("Error deleting product")
      return false;
    }
  }




}
