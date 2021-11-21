import { Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Get('all-categories')
  async getAllCategories() {
    return await this.categoryService.getCategories();
  }

  @Post('new-category')
  async createNewCategory(CreateCategoryDto:CreateCategoryDto) {
    return await this.categoryService.addCategory(CreateCategoryDto);
  }




}
