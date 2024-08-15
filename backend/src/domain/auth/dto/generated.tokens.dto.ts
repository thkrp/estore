import { PublicUser } from 'app-shared';
import { RefreshTokenDto } from './refresh.token.dto';

export class GeneratedTokensDto {
    accessToken: string;
    user: PublicUser;
    refreshTokenCookie: RefreshTokenDto;
}
