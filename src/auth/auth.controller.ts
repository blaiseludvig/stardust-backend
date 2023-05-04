import { Body, Controller, HttpCode, Post, UseFilters, UseGuards } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import UserAccountInfoDto from 'src/users/dto/user-account-info.dto';
import { UserAlreadyExistsFilter } from 'src/users/exceptions/user-already-exists.filter';
import { ReqUser } from 'src/users/user.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@UseFilters(new UserAlreadyExistsFilter())
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/signup')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return this.authService.createJWT(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@ReqUser() user: UserAccountInfoDto) {
    return this.authService.createJWT(user);
  }
}
