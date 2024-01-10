import { Product } from 'app-shared';

export type CartItem = {
    product: Product;
    count: number;
};

export interface CartState {
    isLoading: boolean;
    items: CartItem[];
}
