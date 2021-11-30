import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
const URL = 'mongodb://localhost:27017/category_product';

@Module({
  imports: [

    MulterModule.register({
    dest: '../products-images',
  },     ),
    CommonModule,
    MongooseModule.forRoot(URL, {
      authSource: 'admin',
      user: 'admin',
      pass: 'admin',
    useNewUrlParser:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
