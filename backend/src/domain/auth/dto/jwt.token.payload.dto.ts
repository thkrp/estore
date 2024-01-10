import { RefreshTokenDto } from './refresh.token.dto';

export class JwtTokenPayloadDto {
    sub: string;
    email: string;
    isActive: boolean;
    iat?: number;
    exp?: number;
}

export class RefreshTokenPayloadDto extends JwtTokenPayloadDto {
    token: RefreshTokenDto;
}
