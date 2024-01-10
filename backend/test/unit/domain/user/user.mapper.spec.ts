import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../../src/domain/user/user.entity';
import { UserMapper } from '../../../../src/domain/user/user.mapper';

describe('userMapper', () => {
    let mapper: UserMapper;

    const user: User = {
        password: 'passwordhash',
        refreshTokens: [],
        id: '70e2a026-fcf2-434c-a13e-b88e8fb97096',
        email: 'test@test.com',
        isActive: false
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserMapper]
        }).compile();
        mapper = module.get<UserMapper>(UserMapper);
    });

    it('should be defined', () => {
        expect(mapper).toBeDefined();
    });

    it('mapUserToPublicUser should return public fields', async () => {
        expect(mapper.mapUserToPublicUser(user)).toEqual({
            email: 'test@test.com',
            isActive: false
        });
    });
});
