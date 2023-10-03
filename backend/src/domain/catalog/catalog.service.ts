import { Injectable } from '@nestjs/common';
import { Brand, DetailedProduct, Product } from 'app-shared';
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

    async getArrivals(): Promise<Product[]> {
        const { data } = await this.apiService.doGet<Product[]>({
            url: `/catalog/arrivals`
        });

        return data;
    }

    async getDiscounted(): Promise<Product[]> {
        const { data } = await this.apiService.doGet<Product[]>({
            url: `/catalog/discounted`
        });

        return data;
    }

    async getBrands(): Promise<Brand[]> {
        const { data } = await this.apiService.doGet<Brand[]>({
            url: `/catalog/brands`
        });

        return data;
    }

    async getProducts(queryParams: any): Promise<Product[]> {
        const { data } = await this.apiService.doGet<Product[]>({
            url: `/catalog/products`,
            queryParams
        });

        return data;
    }
}
