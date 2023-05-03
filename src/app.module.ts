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
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'better-sqlite3',
          database: configService.get('DB_PATH'),
          entities: [User, Note],
          synchronize: true,
        };
      },
      inject: [ConfigService],
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
    private readonly configServcie: ConfigService,
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
