import { Brand, Product } from 'app-shared';

export interface ProductsOfSection {
    isLoading: boolean;
    items?: Product[];
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
