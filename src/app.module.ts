import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import promptSync from 'prompt-sync';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createRandomUserArray } from './testData';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';
import CreateUserDto from './users/dto/create-user.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sql',
      entities: [User, Note],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    if ((await this.usersService.findAll()).length < 1) {
      const prompt = promptSync({ sigint: true });
      let answer = '';

      for (;;) {
        answer = prompt(
          'Database is empty. Populate with test data? (Y / n): ',
        ).toLowerCase();

        if (answer == 'y' || answer == '') {
          createRandomUserArray(10).map((user) =>
            this.usersService.create(user),
          );
          return;
        } else if (answer == 'n') {
          return;
        } else {
          continue;
        }
      }
    }
  }
}
