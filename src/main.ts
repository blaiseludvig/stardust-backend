import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import UpdateUserDto from './users/dto/update-user.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable transform for using default values in DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    maxAge: 7200,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Stardust backend')
    .setDescription('API documentation for the Stardust backend')
    .setVersion('1.0')
    .build();

  // UpdateUserDto currently not used in any controller
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [UpdateUserDto],
  });

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: 10,
      defaultModelExpandDepth: 10,
    },
  });

  await app.listen(3000);
}
bootstrap();
