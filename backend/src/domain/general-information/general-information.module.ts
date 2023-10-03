import { Module } from '@nestjs/common';
import { AxiosAdapterService } from '../../axios-adapter/axios-adapter.service';
import { AxiosAdapter } from '../../axios-adapter/axios-adapter.module';
import { GeneralInformationController } from './general-information.controller';
import { GeneralInformationService } from './general-information.service';

@Module({
    imports: [AxiosAdapter],
    providers: [AxiosAdapterService, GeneralInformationService],
    controllers: [GeneralInformationController]
})
export class GeneralInformationModule {}
