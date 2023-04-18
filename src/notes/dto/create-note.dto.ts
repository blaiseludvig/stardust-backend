import { ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'The title of the note' +
      '<br>' +
      'Note: at least one of these properties must be defined.',
  })
  title?: string = '';

  @IsOptional()
  @ApiPropertyOptional({
    description: 'The type of the note (currently not implemented)',
  })
  type?: string = 'text';

  @IsOptional()
  @ApiPropertyOptional({
    description: 'The text content of the note',
  })
  content?: string = '';
}
