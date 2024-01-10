import { CartItem, CartState } from '../types/cart.state';

export const getCartItemsHandler = (state: CartState, items: CartItem[]) => ({
    ...state,
    items
});

export const updateCartItemsHandler = (state: CartState, { product, count }: CartItem) => {
    const { items } = state;
    const existing = !!items.filter(item => item.product.code === product.code).length;
    if (existing) {
        const updatedItems = items.map(item => {
            if (item.product.code === product.code) {
                return {
                    ...item,
                    count: item.count + count
                };
            }
            return item;
        });

        return {
            ...state,
            items: updatedItems
        };
    }

    return {
        ...state,
        items: [...state.items, { product, count }]
    };
};

export const removeCartItemHandler = (state: CartState, code: string) => {
    const updatedItems = state.items.filter(item => item.product.code !== code);

    return {
        ...state,
        items: updatedItems
    };
};
