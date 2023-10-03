import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapterService } from './axios-adapter.service';

@Module({
    imports: [HttpModule],
    providers: [AxiosAdapterService],
    exports: [HttpModule]
})
export class AxiosAdapter implements OnModuleInit {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) {}

    public onModuleInit(): any {
        const { axiosRef: axios } = this.httpService;
        axios.defaults.baseURL = this.configService.get('BITRIX_BACKEND_ORIGIN');
        axios.defaults.headers.common['x-api-key'] = this.configService.get('BITRIX_API_KEY');
    }
}
