import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

// The user's account information without the password
export default class UserAccountInfoDto
  implements Omit<User, 'password' | 'notes'>
{
  @ApiProperty({ description: 'The user id', example: 23 })
  userId!: number;

  @ApiProperty({
    description: "The user's email address",
    example: 'example@gmail.com',
  })
  email!: string;

  @ApiProperty({
    description: "The user's registration date as an ISO8601 UTC string",
    format: 'YYYY-MM-DDTHH:MM:SS.000Z',
    example: '2023-04-16T22:09:04.000Z',
  })
  registartionDate!: Date;
}
