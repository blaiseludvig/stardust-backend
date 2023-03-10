import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDeletedException extends HttpException {
  constructor() {
    super('The requested user had been deleted', HttpStatus.GONE, {
      cause: new Error(
        'The authentication token refers to a user that had been deleted',
      ),
    });
  }
}
