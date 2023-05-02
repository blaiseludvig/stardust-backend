import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { ReqUser } from 'src/users/user.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/signup')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@ReqUser() user: ReqUser) {
    return this.authService.login(user);
  }
}
