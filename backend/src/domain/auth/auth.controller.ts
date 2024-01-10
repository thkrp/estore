import { Body, Controller, Post, UseGuards, UseInterceptors, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponse } from 'app-shared';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { CurrentUser } from '../common/decorators/current.user';
import { ApplicationException } from '../../exception/application.exception';
import { ApiAppResponse } from '../../response/decorators/swagger/api.response';
import { ApiValidationErrorResponse } from '../../response/decorators/swagger/api.validation.error.response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { PublicRoute } from './decorators/public.route';
import { RefreshTokenGuard } from './guards/refresh.token.guard';
import { SetRefreshTokenCookieInterceptor } from './interceptors/set.refresh.token.cookie.interceptor';
import { RefreshTokenPayloadDto } from './dto/jwt.token.payload.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

@ApiTags('auth')
@PublicRoute()
@UseInterceptors(SetRefreshTokenCookieInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Version('1')
    @ApiAppResponse({ status: 201, description: 'User successfully created.' }, AuthResponseDto)
    @ApiValidationErrorResponse()
    @Post('new')
    async createUser(@Body() dto: CreateUserDto): Promise<AppResponse<AuthResponseDto>> {
        try {
            return {
                data: await this.authService.register(dto)
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }

    @Version('1')
    @ApiAppResponse({ status: 200, description: 'User is logged in' }, AuthResponseDto)
    @Post('login')
    async login(@Body() dto: LoginDto): Promise<AppResponse<AuthResponseDto>> {
        try {
            const data = await this.authService.login(dto);

            return {
                data
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }

    @Version('1')
    @ApiAppResponse({ status: 200, description: 'Tokens have been updated' }, AuthResponseDto)
    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    async refresh(@CurrentUser() user: RefreshTokenPayloadDto): Promise<AppResponse<AuthResponseDto>> {
        try {
            const data = await this.authService.refreshToken(user);
            return {
                data
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }

    @Version('1')
    @UseGuards(RefreshTokenGuard)
    @Post('/logout')
    async logout(@CurrentUser() user: RefreshTokenPayloadDto): Promise<AppResponse<AuthResponseDto>> {
        try {
            const data = await this.authService.logout(user);
            return {
                data
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }
}
