import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from 'app-shared';
import { User } from '../../../../src/domain/user/user.entity';
import { AuthMapper } from '../../../../src/domain/auth/auth.mapper';

describe('AuthMapper', () => {
    let mapper: AuthMapper;

    const user: User = {
        password: 'passwordhash',
        refreshTokens: [],
        id: '70e2a026-fcf2-434c-a13e-b88e8fb97096',
        email: 'test@test.com',
        isActive: false,
        role: UserRole.CLIENT
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthMapper]
        }).compile();
        mapper = module.get<AuthMapper>(AuthMapper);
    });

    it('should be defined', () => {
        expect(mapper).toBeDefined();
    });

    it('mapUserToAccessTokenPayload should return jwt payload dto', async () => {
        expect(mapper.mapUserToAccessTokenPayload(user)).toEqual({
            sub: '70e2a026-fcf2-434c-a13e-b88e8fb97096',
            email: 'test@test.com',
            isActive: false,
            role: 'CLIENT'
        });
    });
});
