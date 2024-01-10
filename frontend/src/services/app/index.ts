import {
    AppResponse,
    Localization,
    BottomMenu,
    CatalogMenu,
    TopMenu,
    GeneralInfo,
    TranslationHashResponse,
    TranslationResponse
} from 'app-shared';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';

class AppService {
    async fetchAppInfo(): Promise<AppResponse<GeneralInfo>> {
        const { data } = await axiosAdapter.doGet<AppResponse<GeneralInfo>>({ url: '/v1/general-information' });
        return data;
    }

    async fetchTopMenu(): Promise<AppResponse<TopMenu>> {
        const { data } = await axiosAdapter.doGet<AppResponse<TopMenu>>({ url: '/v1/navigation/top-menu' });
        return data;
    }

    async fetchBottomMenu(): Promise<AppResponse<BottomMenu>> {
        const { data } = await axiosAdapter.doGet<AppResponse<BottomMenu>>({ url: '/v1/navigation/bottom-menu' });
        return data;
    }

    async fetchCatalogMenu(): Promise<AppResponse<CatalogMenu>> {
        const { data } = await axiosAdapter.doGet<AppResponse<CatalogMenu>>({ url: '/v1/navigation/catalog-menu' });
        return data;
    }

    async getTranslation(localization: Localization): Promise<AppResponse<TranslationResponse>> {
        const { data } = await axiosAdapter.doGet<AppResponse<TranslationResponse>>({
            url: `/v1/translation/${localization}`
        });
        return data;
    }

    async getTranslationHash(localization: Localization): Promise<AppResponse<TranslationHashResponse>> {
        const { data } = await axiosAdapter.doGet<AppResponse<TranslationHashResponse>>({
            url: `/v1/translation/hash/${localization}`
        });

        return data;
    }
}

export const appService = new AppService();
