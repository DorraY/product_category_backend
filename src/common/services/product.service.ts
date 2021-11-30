import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../models/category";
import { Product, ProductDocument } from "../models/product";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from '../dto/update-product.dto';
import { unlink } from 'fs';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private readonly ProductModel: Model<ProductDocument>,
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
  ) {
  }

  async getProducts(categoryId) {
    try {
      return await this.ProductModel.find({category:categoryId.id}).populate('category');
    } catch (error) {
      throw (error)
    }
  }

  async addProduct(image : Express.Multer.File,  createProductDto:CreateProductDto) {
    try {
      let productData = {...createProductDto,image: image?.path}
      let createdProduct =  await this.ProductModel.create(productData);
      return await this.ProductModel.findOne({_id:createdProduct._id}).populate("category");

    } catch (error) {
      throw (error)
    }
  }

  async updateProduct(id:String,updateProductDto: UpdateProductDto,image:  Express.Multer.File) {
    try {
      let productToUpdate = await this.ProductModel.findById(id);
      productToUpdate.name = (updateProductDto.name!==null && updateProductDto.name!==undefined) ? updateProductDto?.name : productToUpdate.name;
      productToUpdate.expiryDate = (updateProductDto.expiryDate!==null && updateProductDto.expiryDate!==undefined) ? updateProductDto?.expiryDate : productToUpdate.expiryDate;
      productToUpdate.category = (updateProductDto.category!==null && updateProductDto.category!==undefined) ? updateProductDto?.category : productToUpdate.category;
      productToUpdate.price = (updateProductDto.price!==null && updateProductDto.price!==undefined) ? updateProductDto?.price : productToUpdate.price;
      productToUpdate.image = image?.path;
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
        unlink(productToDelete.image, (err) => {
          if (err) throw err;
          console.log(productToDelete.image+' was deleted');
        });
        await this.ProductModel.deleteOne({ _id: id });
        return true;
      }
    } catch (e) {
      throw (e)
    }
  }

  async saveImageDataToDatabase(image: Express.Multer.File) {
    return image.path;
  }



}
