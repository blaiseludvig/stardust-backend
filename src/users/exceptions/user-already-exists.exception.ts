import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(
      'This email address already has an account associated with it.',
      HttpStatus.CONFLICT,
    );
  }
}
