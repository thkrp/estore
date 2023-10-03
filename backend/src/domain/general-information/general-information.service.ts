import { Injectable } from '@nestjs/common';
import { GeneralInfo } from 'app-shared';
import { AxiosAdapterService } from '../../axios-adapter/axios-adapter.service';

@Injectable()
export class GeneralInformationService {
    constructor(private readonly apiService: AxiosAdapterService) {}

    async fetchGeneralInfo() {
        const { data } = await this.apiService.doGet<GeneralInfo>({
            url: '/site-information'
        });

        return data;
    }
}
