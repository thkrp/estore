import { BadRequestException, Controller, Get, Version } from '@nestjs/common';
import { GeneralInfo } from 'app-shared';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../auth/decorators/public.route';
import { AppResponse } from '../../response/app.response';
import { GeneralInformationService } from './general-information.service';

@PublicRoute()
@Controller('general-information')
export class GeneralInformationController {
    constructor(private readonly generalInfoService: GeneralInformationService) {}

    @Version('1')
    @ApiTags('bitrix')
    @Get('/')
    async fetchGeneralInfo(): Promise<AppResponse<GeneralInfo>> {
        try {
            return {
                data: await this.generalInfoService.fetchGeneralInfo()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
