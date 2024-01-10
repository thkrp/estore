import { Injectable } from '@nestjs/common';
import { Brand, DetailedProduct, FilterParams, Product, Products } from 'app-shared';
import { AxiosAdapterService } from '../../axios-adapter/axios-adapter.service';

@Injectable()
export class CatalogService {
    constructor(private readonly apiService: AxiosAdapterService) {}

    async getBestSales(): Promise<Product[]> {
        const { data } = await this.apiService.doGet<Product[]>({
            url: `/catalog/best-sales`
        });

        return data;
    }

    async getProductByCode(code: string): Promise<DetailedProduct> {
        const { data } = await this.apiService.doGet<DetailedProduct>({
            url: `/catalog/products/${code}`
        });

        return data;
    }

    async getArrivals(pageNumber: number = 1): Promise<Products> {
        const { data } = await this.apiService.doGet<Products>({
            url: `/catalog/arrivals`,
            queryParams: { pageNumber }
        });

        return data;
    }

    async getDiscounted(pageNumber: number = 1): Promise<Products> {
        const { data } = await this.apiService.doGet<Products>({
            url: `/catalog/discounted`,
            queryParams: { pageNumber }
        });

        return data;
    }

    async getBrands(): Promise<Brand[]> {
        const { data } = await this.apiService.doGet<Brand[]>({
            url: `/catalog/brands`
        });

        return data;
    }

    async getProducts(queryParams: FilterParams): Promise<Product[]> {
        const { data } = await this.apiService.doGet<Product[]>({
            url: `/catalog/products`,
            queryParams
        });

        return data;
    }
}
