import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MongooseModule } from "@nestjs/mongoose";

const URL = 'mongodb://localhost:27017/category_product';

@Module({
  imports: [
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
