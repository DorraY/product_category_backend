import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { Product, ProductSchema } from "./models/product";
import { Category, CategorySchema } from "./models/category";
import { CategoryService } from "./services/category.service";
import { CategoryController } from "./controllers/category.controller";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Category.name, schema: CategorySchema },
  ]),],
  controllers: [ProductController,CategoryController],
  providers: [CategoryService,ProductService],
})
export class CommonModule {

}
