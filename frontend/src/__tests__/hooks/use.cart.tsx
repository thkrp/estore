import React from 'react';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import useCart from '../../common/hooks/use.cart';

describe('count cart items and sum', () => {
    it('should return cart items and sum', () => {
        const mockStore = configureStore();
        const store = mockStore({
            cart: {
                items: [
                    {
                        product: {
                            'name': 'Адаптер к мотоблоку "АРА"',
                            'image': '/products/5e9562d42248e2ec1d2a5d2a7c3b07d7.jpg',
                            'id': '958',
                            'url': '/catalog/motoblochnoe-navesnoe-oborudovanie/adaptery-dlya-motoblokov/adapter-k-motobloku-ara',
                            'code': 'adapter-k-motobloku-ara',
                            'brand': [],
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
                            'brand': [],
                            'price': '3840',
                            'price_old': ''
                        },
                        count: 2
                    }
                ]
            }
        });
        const wrapper = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;
        const { result } = renderHook(useCart, { wrapper });
        expect(result.current.count).toEqual(2);
        expect(result.current.sum).toEqual(3840 * 2 + 3000);
    });
});
