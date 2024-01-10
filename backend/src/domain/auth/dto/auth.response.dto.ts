import { ApiProperty } from '@nestjs/swagger';
import { AuthResponse, PublicUser } from 'app-shared';

export class AuthResponseDto implements AuthResponse {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    user: PublicUser;
}
