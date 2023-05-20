import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { hateoasValue } from '../values/hateoas.value';

export interface Response<T> {
  data: T;
}

@Injectable()
export class GlobalResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req: Request = ctx.switchToHttp().getRequest();
    const path = req.url.slice(1);
    const link = hateoasValue[path];
    const isHateoas = false;
    if (isHateoas) {
      return next.handle().pipe(map((data) => ({ data, link })));
    }
    return next.handle();
  }
}
