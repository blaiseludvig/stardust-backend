import { ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @ApiPropertyOptional()
  title?: string = '';

  @IsOptional()
  @ApiPropertyOptional()
  type?: string = 'text';

  @IsOptional()
  @ApiPropertyOptional()
  content?: string = '';
}
