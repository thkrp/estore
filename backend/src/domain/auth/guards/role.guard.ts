import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'app-shared';
import { IS_PUBLIC_KEY } from '../decorators/public.route';
import { ROLES } from '../decorators/has.roles';
import { JwtTokenPayloadDto } from '../dto/jwt.token.payload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    #isPublic(context: ExecutionContext): boolean {
        return Boolean(
            this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        );
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (this.#isPublic(context)) {
            return true;
        }
        const roles: UserRole[] | null = this.reflector.getAllAndOverride<UserRole[]>(ROLES, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: JwtTokenPayloadDto = request.user;
        return roles.includes(user?.role);
    }
}
