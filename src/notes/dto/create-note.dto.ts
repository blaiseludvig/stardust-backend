import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsOptional } from 'class-validator';
import { v4 as secureUUIDv4 } from '@lukeed/uuid/secure';
import { Transform } from 'class-transformer';

export class CreateNoteDto {
  @IsOptional()
  @Transform(() => secureUUIDv4())
  @ApiHideProperty()
  noteId: string = secureUUIDv4();

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
