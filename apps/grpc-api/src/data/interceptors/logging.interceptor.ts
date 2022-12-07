import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const method = request.method;
    const now = Date.now();
    Logger.log(`Start ${method}: ${url} in ${new Date()}`);

    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`End ${method}: ${url} in ${Date.now() - now}ms`)),
      );
  }
}
