import { Request } from 'express';
import { JwtTokenPayloadDto } from '../../../domain/auth/dto/jwt.token.payload.dto';

export interface RequestDto extends Request {
    user?: JwtTokenPayloadDto;
}
