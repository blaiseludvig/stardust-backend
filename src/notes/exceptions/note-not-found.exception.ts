import { HttpException, HttpStatus } from '@nestjs/common';

export class NoteNotFoundException extends HttpException {
  constructor() {
    super(
      'The requested note does not exist, or was deleted',
      HttpStatus.NOT_FOUND,
      { cause: new Error('invalid note id') },
    );
  }
}
