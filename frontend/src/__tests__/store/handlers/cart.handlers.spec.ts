import { Product } from 'app-shared';
import { CartState } from '../../../scenes/Cart/types/cart.state';
import { getCartItemsHandler, removeCartItemHandler, updateCartItemsHandler } from '../../../scenes/Cart/handlers';

describe('cart handlers', () => {
    let state: CartState;
    let product: Product;
    beforeEach(() => {
        state = {
            isLoading: false,
            items: []
        };
        product = {
            'name': 'Адаптер к мотоблоку "АРА"',
            'image': '/products/5e9562d42248e2ec1d2a5d2a7c3b07d7.jpg',
            'id': '958',
            'url': '/catalog/motoblochnoe-navesnoe-oborudovanie/adaptery-dlya-motoblokov/adapter-k-motobloku-ara',
            'code': 'adapter-k-motobloku-ara',
            'price': '3000',
            'price_old': ''
        };
    });
    it('getCartItemsHandler should return state with cart items', () => {
        const items = [
            {
                product: {
                    'name': 'Адаптер к мотоблоку "АРА"',
                    'image': '/products/5e9562d42248e2ec1d2a5d2a7c3b07d7.jpg',
                    'id': '958',
                    'url': '/catalog/motoblochnoe-navesnoe-oborudovanie/adaptery-dlya-motoblokov/adapter-k-motobloku-ara',
                    'code': 'adapter-k-motobloku-ara',
                    'price': '3000',
                    'price_old': ''
                },
                count: 1
            },
            {
                product: {
                    'name': 'Адаптер для мотоблоков с водяным охлаждением "Премиум"',
                    'image': '/upload/iblock/41a/41a1a3262c1ea2a72879dbe711bef5da.jpg',
                    'id': '961',
                    'url': '',
                    'code': 'adapter-dlya-motoblokov-s-vodyanym-okhlazhdeniem-premium',
                    'price': '3840',
                    'price_old': ''
                },
                count: 2
            }
        ];
        expect(getCartItemsHandler(state, items)).toEqual({ ...state, items });
    });

    it('updateCartItemsHandler should add or update cart item', () => {
        const item = {
            product,
            count: 1
        };
        state = updateCartItemsHandler(state, item);
        expect(state).toEqual({ ...state, items: [{ product, count: 1 }] });
        state = updateCartItemsHandler(state, item);
        expect(state).toEqual({ ...state, items: [{ product, count: 2 }] });
    });

    it('removeCartItemHandler should remove cart item', () => {
        state = {
            isLoading: false,
            items: [{ product, count: 1 }]
        };

        expect(removeCartItemHandler(state, 'adapter-k-motobloku-ara')).toEqual({ ...state, items: [] });
    });
});
