import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { NoteNotFoundException } from './note-not-found.exception';

@Catch(NoteNotFoundException)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: NoteNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      cause: exception.cause?.message,
    });
  }
}
