import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';
import { ErrorMessages } from 'app-shared';
import { IS_PUBLIC_KEY } from '../decorators/public.route';
import { ApplicationException } from '../../../exception/application.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt-access-token') {
    constructor(private reflector: Reflector) {
        super();
    }

    #isPublic(context: ExecutionContext): boolean {
        return Boolean(
            this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status: any) {
        if (info instanceof TokenExpiredError) {
            throw ApplicationException.unauthorized(ErrorMessages.ExpiredAccessToken);
        }
        return super.handleRequest(err, user, info, context, status);
    }

    canActivate(context: ExecutionContext) {
        if (this.#isPublic(context)) {
            return true;
        }

        return super.canActivate(context);
    }
}
