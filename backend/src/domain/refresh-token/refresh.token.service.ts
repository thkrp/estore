import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RefreshToken } from './refresh.token.entity';

@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>
    ) {}
    async addRefreshTokenToUser(user: User, tokenHash: string): Promise<string> {
        const entity = {
            user,
            tokenHash
        };
        const token = await this.refreshTokenRepository.save(entity);

        return token.id!;
    }

    async updateRefreshToken(id: string, tokenHash: string) {
        const updated = await this.refreshTokenRepository.update(
            { id },
            {
                tokenHash: tokenHash
            }
        );
        if (!updated?.affected) {
            throw new BadRequestException();
        }

        return id;
    }

    async getTokenById(id: string) {
        return await this.refreshTokenRepository.findOne({ where: { id } });
    }

    async removeToken(id: string) {
        return await this.refreshTokenRepository.delete({
            id
        });
    }
}
