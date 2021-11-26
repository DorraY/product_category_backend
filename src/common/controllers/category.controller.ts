import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Get('all-categories')
  async getAllCategories() {
    return await this.categoryService.getCategories();
  }

  @Post('new-category')
  async createNewCategory( @Body() createCategoryDto:CreateCategoryDto) {
    return await this.categoryService.addCategory(createCategoryDto);
  }


  @Put('update-category/:id')
  async updateCategory(@Param('id') id: string,
                      @Body() updateCategoryDto: UpdateCategoryDto,) {
    return await this.categoryService.updateCategory(id,updateCategoryDto);
  }

  @Delete('delete-category/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }




}
