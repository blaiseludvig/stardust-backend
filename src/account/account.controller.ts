import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import UserAccountInfoDto from 'src/users/dto/user-account-info.dto';
import { UserDeletedFilter } from 'src/users/exceptions/user-deleted.filter';
import { ReqUser } from 'src/users/user.decorator';

@ApiBearerAuth()
@Controller('account')
export class AccountController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

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
}
