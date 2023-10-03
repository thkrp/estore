import { DetailedProduct, Product, Products } from 'app-shared';
import { CatalogState } from '../types/catalog.state';

export const viewedProductsUpdateHandler = (state: CatalogState, viewed: Product[]) => ({
    ...state,
    viewed
});

export const detailProductUpdateHandler = (state: CatalogState, detailed: DetailedProduct) => ({
    ...state,
    detailed
});

export const productsUpdateHandler = (state: CatalogState, products: Products) => ({
    ...state,
    products: {
        ...state.products,
        ...products
    }
});
