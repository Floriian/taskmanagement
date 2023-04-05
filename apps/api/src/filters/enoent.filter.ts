import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class EnoentExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.code === 'ENOENT') {
      response.status(HttpStatus.NOT_FOUND).json({
        message: "This route is doesn't exists",
      });
    }
    response.sendStatus(status);
  }
}
