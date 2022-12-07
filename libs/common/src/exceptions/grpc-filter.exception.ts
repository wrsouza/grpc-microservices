import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return new RpcException(exception.getResponse());
  }
}
