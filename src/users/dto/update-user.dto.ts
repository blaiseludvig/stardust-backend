import { PartialType } from '@nestjs/mapped-types';
import { IsDefined } from 'class-validator';
import CreateUserDto from './create-user.dto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsDefined()
  userId: number;
}
