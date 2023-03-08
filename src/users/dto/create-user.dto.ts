import { IsDefined, IsEmail } from 'class-validator';

export default class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsDefined()
  password!: string;
}
