import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export default class CreateUserDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty({
    description: "The user's email address",
    example: 'example@gmail.com',
  })
  email!: string;

  @IsDefined()
  @ApiProperty({
    description: "The user's email password",
    example: 'my_strong_and_secure_password',
  })
  password!: string;
}
