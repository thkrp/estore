import { AppResponse, Brand, DetailedProduct, FilterParams, Product, Products } from 'app-shared';
import { axiosAdapter } from '../common/helpers/axios-adatpter';

class CatalogService {
    async getArrivals(): Promise<AppResponse<Product[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Product[]>>({ url: '/catalog/arrivals' });
        return data;
    }

    async getDiscounted(): Promise<AppResponse<Product[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Product[]>>({ url: '/catalog/discounted' });
        return data;
    }

    async getBestSales(): Promise<AppResponse<Product[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Product[]>>({ url: '/catalog/best-sales' });
        return data;
    }

    async getBrands(): Promise<AppResponse<Brand[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Brand[]>>({ url: '/catalog/brands' });
        return data;
    }

    async getDetailedProduct(id: string): Promise<AppResponse<DetailedProduct>> {
        const { data } = await axiosAdapter.doGet<AppResponse<DetailedProduct>>({
            url: `/catalog/products/${id}`
        });
        return data;
    }

    async getProducts(queryParams: FilterParams): Promise<AppResponse<Products>> {
        const { data } = await axiosAdapter.doGet<AppResponse<Products>>({
            url: '/catalog/products',
            queryParams
        });
        return data;
    }
}

export const catalogService = new CatalogService();
