import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable transform for using default values in DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const documentConfig = new DocumentBuilder()
    .setTitle('Stardust API')
    .setDescription('Stardust API specification')
    .setVersion('0.1')
    .build();

  const openApiDocument = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/docs/api', app, openApiDocument);

  await app.listen(3000);
}
bootstrap();
