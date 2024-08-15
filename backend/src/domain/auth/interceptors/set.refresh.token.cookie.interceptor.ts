import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { AppResponse } from '../../../response/app.response';
import { GeneratedTokensDto } from '../dto/generated.tokens.dto';

const COOKIE_NAME = 'refresh_token';
@Injectable()
export class SetRefreshTokenCookieInterceptor implements NestInterceptor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((data: AppResponse<GeneratedTokensDto>) => {
                if (!data?.data?.refreshTokenCookie) {
                    response.clearCookie(COOKIE_NAME);
                    return null;
                }
                const {
                    data: { refreshTokenCookie, ...rest }
                } = data;

                response.cookie(COOKIE_NAME, refreshTokenCookie, {
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
