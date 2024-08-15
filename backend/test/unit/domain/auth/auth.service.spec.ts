import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'app-shared';
import { AuthService } from '../../../../src/domain/auth/auth.service';
import { AuthMapper } from '../../../../src/domain/auth/auth.mapper';
import { RefreshTokenService } from '../../../../src/domain/refresh-token/refresh.token.service';
import { UserService } from '../../../../src/domain/user/user.service';
import { repositoryMockFactory } from '../../../common/helpers/repository.helper';
import { RefreshToken } from '../../../../src/domain/refresh-token/refresh.token.entity';
import { UserMapper } from '../../../../src/domain/user/user.mapper';
import { User } from '../../../../src/domain/user/user.entity';
import { MockType } from '../../../common/types/mock.type';
import { RefreshTokenPayloadDto } from '../../../../src/domain/auth/dto/jwt.token.payload.dto';

describe('authService', () => {
    let service: AuthService;
    let userRepositoryMock: MockType<Repository<User>>;
    let refreshTokenRepositoryMock: MockType<Repository<RefreshToken>>;
    const password = '123';
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NWY3NjJjZC1kMjMzLTQ0MTQtYTVlZi1kMDdiMTU1YjE0MDgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpc0FjdGl2ZSI6ZmFsc2UsImlhdCI6MTcwNDQ2NzU3NSwiZXhwIjoxNzA3MDU5NTc1fQ.-jSc9nimCbsWZzWOOSXHQxD1VWLq5trGy7UURu_icmY';
    const user: User = {
        password: '123',
        refreshTokens: [],
        id: '70e2a026-fcf2-434c-a13e-b88e8fb97096',
        email: 'test@test.com',
        isActive: false,
        role: UserRole.CLIENT
    };

    const refreshToken: RefreshToken = {
        tokenHash: 'tokenhash',
        user: user,
        id: 'uuid-token-id'
    };

    const refreshTokenPayload: RefreshTokenPayloadDto = {
        email: '',
        isActive: false,
        sub: '',
        role: UserRole.CLIENT,
        token: {
            id: 'token-id',
            token: token,
            expires: new Date()
        }
    };
    const tokenRegex = /^[\w-]+\.[\w-]+\.[\w-]+$/;
    const response = {
        accessToken: expect.stringMatching(tokenRegex),
        refreshTokenCookie: {
            id: 'uuid-token-id',
            token: expect.stringMatching(tokenRegex),
            expires: expect.any(Date)
        }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                AuthMapper,
                ConfigService,
                JwtService,
                RefreshTokenService,
                UserService,
                UserMapper,
                { provide: getRepositoryToken(RefreshToken), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            if (key.includes('SECRET')) {
                                return 'TOKEN_SECRET';
                            }
                            return 15;
                        })
                    }
                }
            ]
        }).compile();
        service = module.get<AuthService>(AuthService);
        userRepositoryMock = module.get(getRepositoryToken(User));
        refreshTokenRepositoryMock = module.get(getRepositoryToken(RefreshToken));
        user.password = await bcrypt.hash(password, 10);
        refreshToken.tokenHash = await bcrypt.hash(token.split('.')[2], 10);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('register should register a user and return access token', async () => {
        userRepositoryMock.save.mockReturnValue(user);
        refreshTokenRepositoryMock.save.mockReturnValue(refreshToken);
        refreshTokenRepositoryMock.update.mockReturnValue(refreshToken);
        expect(
            await service.register({
                email: 'test@test.com',
                password: password,
                confirmPassword: password
            })
        ).toEqual(expect.objectContaining(response));
    });

    it('login should login a user and return access token', async () => {
        userRepositoryMock.findOne.mockReturnValue(user);
        refreshTokenRepositoryMock.save.mockReturnValue(refreshToken);
        expect(
            await service.login({
                email: 'test@test.com',
                password: password
            })
        ).toEqual(expect.objectContaining(response));
    });

    it('refreshToken should refresh auth tokens', async () => {
        userRepositoryMock.findOne.mockReturnValue(user);
        refreshTokenRepositoryMock.findOne.mockReturnValue(refreshToken);
        refreshTokenRepositoryMock.update.mockReturnValue({ affected: 1 });
        expect(await service.refreshToken(refreshTokenPayload)).toEqual(expect.objectContaining(response));
    });
});
