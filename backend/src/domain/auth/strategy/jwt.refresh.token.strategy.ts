import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtTokenPayloadDto, RefreshTokenPayloadDto } from '../dto/jwt.token.payload.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([RefreshTokenStrategy.extractJWTFromCookie]),
            ignoreExpiration: false,
            secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true
        });
    }

    private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies['refresh_token']) {
            return req.cookies['refresh_token'].token;
        }
        return null;
    }

    async validate(req: Request, payload: JwtTokenPayloadDto): Promise<RefreshTokenPayloadDto> {
        return {
            ...payload,
            token: req.cookies && req.cookies['refresh_token']
        };
    }
}
