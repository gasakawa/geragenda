import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorResponse } from '../types/error.response';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getStatusCode(exception);

    const errorResponse: ErrorResponse = {
      errors: [
        {
          type: exception.constructor.name,
          message: this.getMessage(exception),
          stackTrace:
            this.config.get('NEST_DEBUG') === 'true'
              ? this.getStackTrace(exception)
              : undefined,
        },
      ],
    };

    response.status(status).json(errorResponse);
  }

  private getStatusCode(exception: HttpException): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: HttpException): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (!!response && typeof response === 'object' && !!response['message']) {
        return response['message'];
      }
    }

    return exception.message;
  }

  private getStackTrace(exception: Error): string {
    return exception.stack;
  }
}
