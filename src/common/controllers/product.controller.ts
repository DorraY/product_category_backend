import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from "../../app.service";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from '../dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {imageFileFilter} from '../utils/image-type-filter';
import { extname } from 'path'
import { FileName } from '../utils/file-name';
@Controller('product')

export class ProductController{

  constructor(private readonly productService: ProductService) {}

  @Get('all-products/:id')
  async getAllProducts(@Param() categoryId: String) {
    console.log(categoryId)
    return await this.productService.getProducts(categoryId);
  }

  @Put('update-product/:id')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: imageFileFilter,
    storage: diskStorage({
      destination: './products-images', filename: FileName })
  }))
  async updateProduct(@Param('id') id: string,
                      @UploadedFile() image:Express.Multer.File,
                      @Body() updateProductDto: UpdateProductDto,) {
    return await this.productService.updateProduct(id,updateProductDto,image);
  }

  @Delete('delete-product/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Post('new-product')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: imageFileFilter,
    storage: diskStorage({
      destination: './products-images', filename: FileName })
  }))
  async createNewProduct(@UploadedFile() image:Express.Multer.File, @Body() createProductDto: CreateProductDto) {
    return await this.productService.addProduct(image,createProductDto);
  }

  @Get('get-product-image')
  async getImage() {
    return {
     image: `localhost:6666/products-images/b4454d9f2b2cd00bb3e443ffaf25508e.jpg`
    }
  }






}
