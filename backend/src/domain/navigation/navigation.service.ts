import { Injectable } from '@nestjs/common';
import { BottomMenu, CatalogMenu, TopMenu } from 'app-shared';
import { AxiosAdapterService } from '../../axios-adapter/axios-adapter.service';

@Injectable()
export class NavigationService {
    constructor(private readonly apiService: AxiosAdapterService) {}

    async fetchTopMenu() {
        const { data } = await this.apiService.doGet<TopMenu>({
            url: '/navigation/top-menu'
        });

        return data;
    }

    async fetchBottomMenu() {
        const { data } = await this.apiService.doGet<BottomMenu>({
            url: '/navigation/bottom-menu'
        });

        return data;
    }

    async fetchCatalogMenu() {
        const { data } = await this.apiService.doGet<CatalogMenu>({
            url: '/navigation/catalog-menu'
        });

        return data;
    }
}
