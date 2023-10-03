import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppResponse, GeneralInfo } from 'app-shared';
import { GeneralInformationService } from './general-information.service';

@Controller('general-information')
export class GeneralInformationController {
    constructor(private readonly generalInfoService: GeneralInformationService) {}

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
