import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = (exception as any).message.message;
    let code = 'HttpException';
    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;

      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;

      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = (exception as TypeORMError).message;
        code = (exception as any).code;
        break;

      case UnprocessableEntityException:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    response.status(status).json({
      statusCode: status,
      message: (exception as any).message,
      path: request.url,
    });
  }
}
