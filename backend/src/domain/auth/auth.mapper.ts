import { User } from '../user/user.entity';
import { JwtTokenPayloadDto } from './dto/jwt.token.payload.dto';

export class AuthMapper {
    mapUserToAccessTokenPayload(user: User): JwtTokenPayloadDto {
        return {
            sub: user.id!,
            email: user.email,
            isActive: user.isActive
        };
    }
}
