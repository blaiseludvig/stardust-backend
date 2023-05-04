import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AccountController],
  imports: [UsersModule],
})
export class AccountModule {}
