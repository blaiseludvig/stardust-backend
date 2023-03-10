import { IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  title = '';

  @IsOptional()
  type = 'text';

  @IsOptional()
  content = '';
}
