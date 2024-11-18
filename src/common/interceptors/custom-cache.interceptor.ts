import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { tap, switchMap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ttl = this.configService.get<number>('vars.updateFrequencyMs');
    const request = context.switchToHttp().getRequest();
    const cacheKey = `${request.method}-${request.url}`;

    return from(this.cache.get(cacheKey)).pipe(
      switchMap((cached) => {
        if (cached) {
          return of(cached);
        }
        return next.handle().pipe(
          tap((response) => {
            this.cache.set(cacheKey, response, ttl);
          }),
        );
      }),
    );
  }
}
