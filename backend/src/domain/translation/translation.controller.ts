import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AppResponse } from 'app-shared';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
    constructor(private readonly translationService: TranslationService) {}

    @Get('/:locale')
    async getTranslation(@Param() { locale }): Promise<AppResponse<any>> {
        try {
            return {
                data: this.translationService.getTranslation(locale)
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Get('/hash/:locale')
    async getTranslationHash(@Param() { locale }): Promise<AppResponse<any>> {
        try {
            return {
                data: this.translationService.getTranslationHash(locale)
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
