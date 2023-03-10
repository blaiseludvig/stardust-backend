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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/auth/signup')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@ReqUser() user: ReqUser) {
    return this.authService.login(user);
  }

  @UseFilters(UserDeletedFilter)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@ReqUser() user: ReqUser) {
    return user;
  }
}
