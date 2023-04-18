import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsDefined()
  @ApiProperty()
  noteId!: string;
}
