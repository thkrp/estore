import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.route';
import { CAN_BE_INACTIVE } from '../decorators/can.be.inactive';
import { JwtTokenPayloadDto } from '../dto/jwt.token.payload.dto';

@Injectable()
export class IsActiveGuard implements CanActivate {
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
        const canBeInactive = Boolean(this.reflector.get<string[]>(CAN_BE_INACTIVE, context.getHandler()));
        if (canBeInactive) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: JwtTokenPayloadDto = request.user;
        return Boolean(user.isActive);
    }
}
