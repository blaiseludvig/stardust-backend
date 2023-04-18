import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsDefined()
  @ApiProperty({ description: 'The id of the note to be updated' })
  noteId!: string;
}
