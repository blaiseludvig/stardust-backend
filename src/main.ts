import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable transform for using default values in DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
