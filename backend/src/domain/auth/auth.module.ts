import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { RefreshTokenModule } from '../refresh-token/refresh.token.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMapper } from './auth.mapper';
import { JwtGuard } from './guards/jwt.guard';
import { AccessTokenStrategy } from './strategy/jwt.access.token.strategy';
import { RefreshTokenGuard } from './guards/refresh.token.guard';
import { RefreshTokenStrategy } from './strategy/jwt.refresh.token.strategy';
import { RolesGuard } from './guards/role.guard';
import { IsActiveGuard } from './guards/is.active.guard';

@Module({
    imports: [UserModule, RefreshTokenModule],
    providers: [
        AuthService,
        AuthMapper,
        AccessTokenStrategy,
        JwtGuard,
        JwtService,
        RefreshTokenStrategy,
        RefreshTokenGuard,
        RolesGuard,
        IsActiveGuard
    ],
    controllers: [AuthController]
})
export class AuthModule {}
