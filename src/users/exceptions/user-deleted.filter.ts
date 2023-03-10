import { UserDeletedException } from './user-deleted.exception';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(UserDeletedException)
export class UserDeletedFilter implements ExceptionFilter {
  catch(exception: UserDeletedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      cause: exception.cause?.message,
    });
  }
}
