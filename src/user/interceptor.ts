import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('hey');
    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        return plainToInstance(this.dto, data, {
          excludePrefixes: ['_'],
        });
      }),
    );
  }
}
