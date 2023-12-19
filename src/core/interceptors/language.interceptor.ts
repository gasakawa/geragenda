import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import global from '@/global';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const lang = request['headers']['x-lang'] as string;

    global.lang = lang === undefined ? 'pt' : lang;

    return next.handle();
  }
}
