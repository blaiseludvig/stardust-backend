import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create-user.dto';
import UserAccountInfoDto from 'src/users/dto/user-account-info.dto';
import { UserAlreadyExistsFilter } from 'src/users/exceptions/user-already-exists.filter';
import { ReqUser } from 'src/users/user.decorator';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import jwtResponseDto from './dto/jwt-response.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@UseFilters(new UserAlreadyExistsFilter())
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Returns a JWT token after a successful signup',
    type: jwtResponseDto,
  })
  @ApiConflictResponse({
    description:
      'Returns 409 when the email address already has an account associated with it.',
  })
  @ApiBadRequestResponse({
    description:
      'When the request data is in an incorrect format, returns a message that explains why the request was rejected.',
  })
  @Public()
  @Post('/signup')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return this.authService.createJWT(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse({
    description:
      'Returns 401 when the email and password combination is incorrect',
  })
  @ApiOkResponse({
    description: 'Returns a JWT token after a successful login',
    type: jwtResponseDto,
  })
  @HttpCode(200)
  @Post('/login')
  async login(@ReqUser() user: UserAccountInfoDto) {
    return this.authService.createJWT(user);
  }
}
