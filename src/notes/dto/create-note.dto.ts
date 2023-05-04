import { ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The title of the note',
    example: "Hello, I'm the new note's title",
  })
  title?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'The type of the note (currently not implemented)',
    example: 'text',
  })
  type?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'The text content of the note',
    example: "The note's content goes here",
  })
  content?: string;
}
