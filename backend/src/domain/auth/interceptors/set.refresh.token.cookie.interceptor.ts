import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class SetRefreshTokenCookieInterceptor implements NestInterceptor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map(data => {
                const {
                    data: { refreshTokenCookie, ...rest }
                } = data;
                response.cookie('refresh_token', refreshTokenCookie, {
                    httpOnly: true,
                    expires: refreshTokenCookie.expires
                });

                return {
                    data: rest
                };
            })
        );
    }
}
