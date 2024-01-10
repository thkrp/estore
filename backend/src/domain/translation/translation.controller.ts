import { BadRequestException, Controller, Get, Param, Version } from '@nestjs/common';
import { Localization, Translation } from 'app-shared';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../auth/decorators/public.route';
import { AppResponse } from '../../response/app.response';
import { ApiAppResponse } from '../../response/decorators/swagger/api.response';
import { TranslationService } from './translation.service';
import { TranslationHashDto } from './dto/translation.hash.dto';
import { TranslationResponseDto } from './dto/translation.response.dto';

type Params = {
    locale: string;
};
@PublicRoute()
@ApiTags('translation')
@Controller('translation')
export class TranslationController {
    constructor(private readonly translationService: TranslationService) {}

    @Version('1')
    @ApiAppResponse({ status: 200 }, TranslationResponseDto)
    @Get('/:locale')
    async getTranslation(@Param() { locale }: Params): Promise<AppResponse<TranslationResponseDto>> {
        try {
            return {
                data: {
                    translation: this.translationService.getTranslation(locale as Localization)
                }
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiAppResponse({ status: 200 }, TranslationHashDto)
    @Get('/hash/:locale')
    async getTranslationHash(@Param() { locale }: Params): Promise<AppResponse<TranslationHashDto>> {
        try {
            return {
                data: {
                    translationHash: this.translationService.getTranslationHash(locale as Localization)
                }
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
