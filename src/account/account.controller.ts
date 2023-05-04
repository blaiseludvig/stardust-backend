import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import UserAccountInfoDto from 'src/users/dto/user-account-info.dto';
import { UserDeletedFilter } from 'src/users/exceptions/user-deleted.filter';
import { ReqUser } from 'src/users/user.decorator';
import UpdateUserDto from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Returns user's account information without the password",
    type: UserAccountInfoDto,
  })
  @UseFilters(UserDeletedFilter)
  @Get('profile')
  getProfile(@ReqUser() user: UserAccountInfoDto) {
    return user;
  }

  @Patch()
  updateProfile(
    @ReqUser() user: UserAccountInfoDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.usersService.update(user.userId, updateUserDto);
  }

  @Delete()
  deleteProfile(@ReqUser() user: UserAccountInfoDto) {
    this.usersService.remove(user.userId);
  }
}
