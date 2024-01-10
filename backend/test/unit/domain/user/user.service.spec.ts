import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../../../src/domain/user/user.service';
import { MockType } from '../../../common/types/mock.type';
import { User } from '../../../../src/domain/user/user.entity';
import { repositoryMockFactory } from '../../../common/helpers/repository.helper';
import { UserMapper } from '../../../../src/domain/user/user.mapper';

describe('UserService', () => {
    let service: UserService;
    let repositoryMock: MockType<Repository<User>>;
    const user: User = {
        password: 'passwordhash',
        refreshTokens: [],
        id: '70e2a026-fcf2-434c-a13e-b88e8fb97096',
        email: 'test@test.com',
        isActive: false
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
                UserMapper
            ]
        }).compile();
        service = module.get<UserService>(UserService);
        repositoryMock = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('createUser should return user if user does not exist', async () => {
        repositoryMock.save.mockReturnValue(user);
        expect(
            await service.createUser({
                email: 'test@test.com',
                password: '1234',
                confirmPassword: '1234'
            })
        ).toEqual(user);
    });

    it('getUserById should return user if user exists', async () => {
        repositoryMock.findOne.mockReturnValue(null);
        expect(await service.getUserById('70e2a026-fcf2-434c-a13e-b88e8fb97096')).toBeFalsy();

        repositoryMock.findOne.mockReturnValue(user);
        expect(await service.getUserById('70e2a026-fcf2-434c-a13e-b88e8fb97096')).toEqual(user);
    });

    it('getUserByEmail should return user if user exists', async () => {
        repositoryMock.findOne.mockReturnValue(null);
        expect(await service.getUserByEmail('test@test.com')).toBeFalsy();

        repositoryMock.findOne.mockReturnValue(user);
        expect(await service.getUserByEmail('test@test.com')).toEqual(user);
    });
});
