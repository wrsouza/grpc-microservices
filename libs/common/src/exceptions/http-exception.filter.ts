import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isArray } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status: HttpStatus = exception.getStatus();
    const response: any = exception.getResponse();

    if (isArray(response.message)) {
      return { status, error: response.message };
    }
    return { status, error: [response.message] };
  }
}
