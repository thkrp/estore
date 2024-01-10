import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../../../common/types/mock.type';
import { User } from '../../../../src/domain/user/user.entity';
import { repositoryMockFactory } from '../../../common/helpers/repository.helper';
import { RefreshTokenService } from '../../../../src/domain/refresh-token/refresh.token.service';
import { RefreshToken } from '../../../../src/domain/refresh-token/refresh.token.entity';

describe('UserService', () => {
    let service: RefreshTokenService;
    let repositoryMock: MockType<Repository<RefreshToken>>;
    const user: User = {
        password: 'passwordhash',
        refreshTokens: [],
        id: '70e2a026-fcf2-434c-a13e-b88e8fb97096',
        email: 'test@test.com',
        isActive: false
    };

    const token = {
        id: 'uuid-token-id',
        token: 'tokenhash',
        expires: new Date()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshTokenService,
                { provide: getRepositoryToken(RefreshToken), useFactory: repositoryMockFactory }
            ]
        }).compile();
        service = module.get<RefreshTokenService>(RefreshTokenService);
        repositoryMock = module.get(getRepositoryToken(RefreshToken));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('addRefreshTokenToUser should return id of new token', async () => {
        repositoryMock.save.mockReturnValue(token);
        expect(await service.addRefreshTokenToUser(user, 'tokenhash')).toEqual('uuid-token-id');
    });

    it('updateRefreshToken should return id of updated token', async () => {
        repositoryMock.update.mockReturnValue({ affected: 1 });
        expect(await service.updateRefreshToken('uuid-token-id', 'tokenhash')).toEqual('uuid-token-id');
    });

    it('updateRefreshToken should return id of updated token', async () => {
        repositoryMock.findOne.mockReturnValue(token);
        expect(await service.getTokenById('uuid-token-id')).toEqual(token);
    });
});
