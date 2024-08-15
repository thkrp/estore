import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { RefreshTokenService } from '../refresh-token/refresh.token.service';
import { User } from '../user/user.entity';
import { ApplicationException } from '../../exception/application.exception';
import { UserMapper } from '../user/user.mapper';
import { LoginDto } from './dto/login.dto';
import { AuthMapper } from './auth.mapper';
import { JwtTokenPayloadDto, RefreshTokenPayloadDto } from './dto/jwt.token.payload.dto';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { GeneratedTokensDto } from './dto/generated.tokens.dto';

@Injectable()
export class AuthService {
    private readonly bcryptRounds = 10;
    constructor(
        private readonly userService: UserService,
        private readonly userMapper: UserMapper,
        private readonly authMapper: AuthMapper,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    // split token, because bcrypt is limited to 72 character "data"
    #getTokenSign(token: string) {
        return token.split('.')[2];
    }

    #hashData(data: string): Promise<string> {
        return bcrypt.hash(data, this.bcryptRounds);
    }

    #daysToSeconds(days: number) {
        return 60 * 60 * 24 * days;
    }

    #validateData(data: string, hash: string): Promise<boolean> {
        return bcrypt.compare(data, hash);
    }

    #generateAccessToken(payload: JwtTokenPayloadDto) {
        const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
        const expiresInMinutes = Number(this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN_MINUTES'));

        return this.jwtService.sign(payload, {
            secret,
            expiresIn: 60 * expiresInMinutes
        });
    }

    #generateRefreshToken(payload: JwtTokenPayloadDto) {
        const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
        const expiresIn = this.#daysToSeconds(Number(this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN_DAYS')));

        return this.jwtService.sign(payload, {
            secret,
            expiresIn
        });
    }

    async #createRefreshTokenCookieData(refreshTokenId: string, refreshToken: string): Promise<RefreshTokenDto> {
        const expiresInDays = this.#daysToSeconds(
            Number(this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN_DAYS'))
        );
        const now = dayjs();
        const expires = now.add(expiresInDays, 's').toDate();

        return {
            id: refreshTokenId,
            token: refreshToken,
            expires
        };
    }

    async #generateTokens(user: User, refreshTokenId?: string): Promise<GeneratedTokensDto> {
        const payload = this.authMapper.mapUserToAccessTokenPayload(user);
        const accessToken = this.#generateAccessToken(payload);
        const refreshToken = this.#generateRefreshToken(payload);
        const sign = this.#getTokenSign(refreshToken);
        const tokenHash = await this.#hashData(sign);
        let rtId;
        if (refreshTokenId) {
            await this.refreshTokenService.updateRefreshToken(refreshTokenId, tokenHash);
            rtId = refreshTokenId;
        } else {
            rtId = await this.refreshTokenService.addRefreshTokenToUser(user, tokenHash);
        }
        const refreshTokenCookie = await this.#createRefreshTokenCookieData(rtId, refreshToken);
        const publicUser = this.userMapper.mapUserToPublicUser(user);
        return { accessToken, refreshTokenCookie, user: publicUser };
    }

    async register(dto: CreateUserDto) {
        dto.password = await this.#hashData(dto.password);
        const user = await this.userService.createUser(dto);

        return await this.#generateTokens(user);
    }

    async login(dto: LoginDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw ApplicationException.loginError();
        }
        const isValid = await this.#validateData(dto.password, user.password);
        if (!isValid) {
            throw ApplicationException.loginError();
        }
        return await this.#generateTokens(user);
    }

    async refreshToken(payload: RefreshTokenPayloadDto) {
        const { token: refreshTokenDto, sub } = payload;
        const user = await this.userService.getUserById(sub);
        if (!user) {
            throw ApplicationException.unauthorized();
        }
        const refreshToken = await this.refreshTokenService.getTokenById(refreshTokenDto.id);
        if (!refreshToken) {
            throw ApplicationException.unauthorized();
        }
        const sign = this.#getTokenSign(refreshTokenDto.token);
        const isValid = await this.#validateData(sign, refreshToken.tokenHash);
        if (!isValid) {
            throw ApplicationException.unauthorized();
        }
        return await this.#generateTokens(user, refreshToken.id);
    }

    async logout(payload: RefreshTokenPayloadDto) {
        const tokenId = payload.token.id;
        await this.refreshTokenService.removeToken(tokenId);
        return null;
    }
}
