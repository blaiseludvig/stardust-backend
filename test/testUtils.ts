import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { existsSync, unlinkSync } from 'fs';
import { AppModule } from 'src/app.module';
import configuration from 'src/configuration';

export async function getDatabasePath() {
  const configModuleFixture = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [configuration],
      }),
    ],
  }).compile();

  const configService = configModuleFixture.get<ConfigService>(ConfigService);

  const DB_PATH = configService.getOrThrow('DB_PATH') as string;

  return DB_PATH;
}

export async function deleteDatabase() {
  const DB_PATH = await getDatabasePath();

  if (existsSync(DB_PATH)) {
    unlinkSync(DB_PATH);
  }
}

export async function initApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();

  return app;
}
