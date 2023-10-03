import { AppResponse, Localization, LocaleMessages, BottomMenu, CatalogMenu, TopMenu, GeneralInfo } from 'app-shared';
import { axiosAdapter } from '../common/helpers/axios-adatpter';

class AppService {
    async fetchAppInfo(): Promise<AppResponse<GeneralInfo>> {
        const { data } = await axiosAdapter.doGet<AppResponse<GeneralInfo>>({ url: '/general-information' });
        return data;
    }

    async fetchTopMenu(): Promise<AppResponse<TopMenu>> {
        const { data } = await axiosAdapter.doGet<AppResponse<TopMenu>>({ url: '/navigation/top-menu' });
        return data;
    }

    async fetchBottomMenu(): Promise<AppResponse<BottomMenu>> {
        const { data } = await axiosAdapter.doGet<AppResponse<BottomMenu>>({ url: '/navigation/bottom-menu' });
        return data;
    }

    async fetchCatalogMenu(): Promise<AppResponse<CatalogMenu>> {
        const { data } = await axiosAdapter.doGet<AppResponse<CatalogMenu>>({ url: '/navigation/catalog-menu' });
        return data;
    }

    async getTranslation(localization: Localization): Promise<AppResponse<LocaleMessages>> {
        const { data } = await axiosAdapter.doGet<AppResponse<LocaleMessages>>({
            url: `/translation/${localization}`
        });
        return data;
    }

    async getTranslationHash(localization: Localization): Promise<AppResponse<string>> {
        const { data } = await axiosAdapter.doGet<AppResponse<string>>({
            url: `/translation/hash/${localization}`
        });
        return data;
    }
}

export const appService = new AppService();
