import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static(path.join(__dirname, '..', 'products-images')));
  await app.listen(6666);
}
bootstrap();
