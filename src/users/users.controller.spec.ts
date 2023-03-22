import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Note } from 'src/notes/entities/note.entity';
import { UsersService } from './users.service';
import { existsSync, unlinkSync } from 'node:fs';
import { createRandomUserArray } from 'src/testData';

const TEST_DB_PATH = 'test_db.sql';

describe('Cats', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    // delete the test database file before each test
    if (existsSync(TEST_DB_PATH)) {
      try {
        unlinkSync(TEST_DB_PATH);
      } catch (error) {
        console.log("The test database couldn't be deleted.");
        throw error;
      }
    }

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: TEST_DB_PATH,
          entities: [User, Note],
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    usersService = app.get(UsersService);
  });

  test(`GET /users`, async () => {
    // there should be no users at the start
    const req = await request(app.getHttpServer()).get('/users');
    expect(req.body).toStrictEqual([]);
  });

  afterAll(async () => {
    // delete the test database file after the test is done
    if (existsSync(TEST_DB_PATH)) {
      try {
        unlinkSync(TEST_DB_PATH);
      } catch (error) {
        console.log("The test database couldn't be deleted.");
        throw error;
      }
    }
    await app.close();
  });
});
