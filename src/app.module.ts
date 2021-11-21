import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { MongooseModule } from "@nestjs/mongoose";

const URL = 'localhost';

@Module({
  imports: [ CommonModule,MongooseModule.forRoot(`mongodb://${URL}/flutter_test`,{useNewUrlParser:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
