import { Brand, Products } from 'app-shared';

export interface ProductsOfSection extends Products {
    isLoading: boolean;
    page: number;
}

export interface BrandsOfSection {
    isLoading: boolean;
    items?: Brand[];
}

export interface HomeState {
    arrivals: ProductsOfSection;
    discounted: ProductsOfSection;
    bestSales: ProductsOfSection;
    brands: BrandsOfSection;
}
