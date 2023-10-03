import { mockData } from 'app-shared';
import {
    detailProductUpdateHandler,
    productsUpdateHandler,
    viewedProductsUpdateHandler
} from '../../../scenes/Catalog/handlers';
import { CatalogState } from '../../../scenes/Catalog/types/catalog.state';

describe('catalog handlers', () => {
    let state: CatalogState;
    beforeEach(() => {
        state = {
            viewed: [],
            products: { isLoading: false }
        };
    });

    it('viewedProductsUpdateHandler should return a state with viewed products', () => {
        const {
            arrivals: [viewed]
        } = mockData;
        expect(viewedProductsUpdateHandler(state, viewed)).toEqual({ ...state, viewed });
    });

    it('detailProductUpdateHandler should return a state with detailed product info', () => {
        const {
            products: {
                items: [detailed]
            }
        } = mockData;
        expect(detailProductUpdateHandler(state, detailed)).toEqual({ ...state, detailed });
    });

    it('productsUpdateHandler should return a state with array of products', () => {
        const { products } = mockData;
        expect(productsUpdateHandler(state, products)).toEqual({
            ...state,
            products: {
                ...state.products,
                ...products
            }
        });
    });
});
