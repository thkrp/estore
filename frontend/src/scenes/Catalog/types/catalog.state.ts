import { DetailedProduct, Product, Products } from 'app-shared';

export interface CatalogState {
    viewed: Product[];
    detailed?: DetailedProduct;
    products: { isLoading: boolean } & Products;
}
