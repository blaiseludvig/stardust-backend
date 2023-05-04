import { ApiProperty } from '@nestjs/swagger';
import { Note } from '../entities/note.entity';

export default class NoteDto implements Omit<Note, 'user'> {
  @ApiProperty({
    description: "The note's identifier",
    format: 'UUID v4',
    example: '34d1d9d7-66b4-495a-aa61-773b68d82e1a',
  })
  noteId!: string;

  @ApiProperty({
    description: "The note's title",
    example: "Hello, I'm the note's title",
  })
  title!: string;

  @ApiProperty({
    description: "The note's content type (currently not implemented)",
    example: 'text',
  })
  type!: string;

  @ApiProperty({
    description: "The note's content",
    example: "This is the note's content",
  })
  content!: string;

  @ApiProperty({
    example: 'true',
  })
  isArchived!: boolean;

  // Swagger cannot infer the type of the property if it's optional,
  // so we must pass the type explicitly
  @ApiProperty({
    description:
      'The date the note was archived as an ISO8601 UTC string, **or null**',
    format: 'YYYY-MM-DDTHH:MM:SS.000Z',
    example: '2023-04-16T22:09:04.000Z',
    type: Date,
  })
  dateArchived!: Date | null;

  @ApiProperty({ example: false })
  isBinned!: boolean;

  @ApiProperty({
    description:
      'The date the note was binned as an ISO8601 UTC string, **or null**',
    format: 'YYYY-MM-DDTHH:MM:SS.000Z',
    example: null,
    type: Date,
  })
  dateBinned!: Date | null;

  @ApiProperty({
    description: 'The date the note was created as an ISO8601 UTC string',
    format: 'YYYY-MM-DDTHH:MM:SS.000Z',
    example: '2023-04-16T22:09:04.000Z',
  })
  dateCreated!: Date;

  @ApiProperty({
    description: 'The date the note was updated as an ISO8601 UTC string',
    format: 'YYYY-MM-DDTHH:MM:SS.000Z',
    example: '2023-04-20T12:51:33.000Z',
  })
  dateUpdated!: Date;
}
