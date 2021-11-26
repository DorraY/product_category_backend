import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AppService } from "../../app.service";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('product')

export class ProductController{

  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @Post('new-product')
  async createNewProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.addProduct(createProductDto);
  }

  @Put('update-product/:id')
  async updateProduct(@Param('id') id: string,
                      @Body() updateProductDto: UpdateProductDto,) {
    return await this.productService.updateProduct(id,updateProductDto);
  }

  @Delete('delete-product/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }


}
