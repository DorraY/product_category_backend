import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../models/category";
import { Product, ProductDocument } from "../models/product";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private readonly ProductModel: Model<ProductDocument>,
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
  ) {
  }

  async getProducts() {
    try {
      return await this.ProductModel.find().populate('category');
    } catch (error) {
      throw (error)
    }
  }

  async addProduct(createProductDto:CreateProductDto) {
    try {
      let createdProduct =  await this.ProductModel.create(createProductDto);
      return await this.ProductModel.findOne({_id:createdProduct._id}).populate("category");

    } catch (error) {
      throw (error)
    }
  }

  async updateProduct(id:String,updateProductDto: UpdateProductDto) {
    try {
      let productToUpdate = await this.ProductModel.findById(id);
      productToUpdate.name = (updateProductDto.name!==null && updateProductDto.name!==undefined) ? updateProductDto?.name : productToUpdate.name;
      productToUpdate.expiryDate = (updateProductDto.expiryDate!==null && updateProductDto.expiryDate!==undefined) ? updateProductDto?.expiryDate : productToUpdate.expiryDate;
      productToUpdate.category = (updateProductDto.category!==null && updateProductDto.category!==undefined) ? updateProductDto?.category : productToUpdate.category;
      productToUpdate.price = (updateProductDto.price!==null && updateProductDto.price!==undefined) ? updateProductDto?.price : productToUpdate.price;
      await productToUpdate.save();
      return await this.ProductModel.findOne({_id:id}).populate("category");
    } catch (error) {
      console.log('Error update product')
      throw (error)
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
      throw (e)
    }
  }




}
