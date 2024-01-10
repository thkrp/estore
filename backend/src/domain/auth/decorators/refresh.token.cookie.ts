import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshTokenCookie = createParamDecorator((_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.cookies['refresh_token'];
});
