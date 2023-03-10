import { PartialType } from '@nestjs/mapped-types';
import { IsDefined } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsDefined()
  noteId!: string;
}
