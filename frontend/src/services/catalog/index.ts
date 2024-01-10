import { AppResponse, Brand, DetailedProduct, FilterParams, Product, Products } from 'app-shared';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';
import { localStorageService } from '../local-storage';
import productMapper from '../../common/mappers/product.mapper';

class CatalogService {
    async getArrivals(pageNumber: number = 1): Promise<AppResponse<Products>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Products>>({
            url: '/v1/catalog/arrivals',
            queryParams: { pageNumber }
        });

        return data;
    }

    async getDiscounted(pageNumber: number = 1): Promise<AppResponse<Products>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Products>>({
            url: '/v1/catalog/discounted',
            queryParams: { pageNumber }
        });
        return data;
    }

    async getBestSales(): Promise<AppResponse<Product[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Product[]>>({ url: '/v1/catalog/best-sales' });
        return data;
    }

    async getBrands(): Promise<AppResponse<Brand[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Brand[]>>({ url: '/v1/catalog/brands' });
        return data;
    }

    async getDetailedProduct(id: string): Promise<AppResponse<DetailedProduct>> {
        const { data } = await axiosAdapter.doGet<AppResponse<DetailedProduct>>({
            url: `/v1/catalog/products/${id}`
        });
        return data;
    }

    async getProducts(queryParams: FilterParams): Promise<AppResponse<Products>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Products>>({
            url: '/v1/catalog/products',
            queryParams
        });
        return data;
    }

    async getViewedProducts() {
        const viewed = localStorageService.getViewedItems();
        const data = await this.getProducts({ productCodes: viewed.join(',') });

        return productMapper.mapResponseToProductItems(data);
    }
}

export const catalogService = new CatalogService();
