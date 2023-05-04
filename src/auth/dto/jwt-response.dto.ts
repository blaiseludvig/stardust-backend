import { ApiProperty } from '@nestjs/swagger';

export default class jwtResponseDto {
  @ApiProperty({
    description: 'The JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;
}
