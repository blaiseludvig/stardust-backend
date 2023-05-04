import { UserDeletedFilter } from './users/exceptions/user-deleted.filter';
import {
  Body,
  Controller,
  createParamDecorator,
  ExecutionContext,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import CreateUserDto from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';
import { ReqUser } from './users/user.decorator';
import { UsersService } from './users/users.service';
import { Public } from './auth/public.decorator';
import UserAccountInfoDto from './users/dto/user-account-info.dto';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @UseFilters(UserDeletedFilter)
  @Get('profile')
  getProfile(@ReqUser() user: UserAccountInfoDto) {
    return user;
  }
}
