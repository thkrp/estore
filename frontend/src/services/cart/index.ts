import { AppResponse, Products } from 'app-shared';
import { CartItem } from '../../scenes/Cart/types/cart.state';
import { localStorageService } from '../local-storage';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';
import productMapper from '../../common/mappers/product.mapper';

type StorageCartItems = Map<string, number>;

class CartService {
    readonly #cartKey = 'cart';

    #getLocalItems(): StorageCartItems {
        return new Map(localStorageService.getObject(this.#cartKey) || []);
    }

    #setLocalItems(items: StorageCartItems) {
        localStorageService.setObject(this.#cartKey, [...items.entries()]);
    }

    #removeLocalItem(id: string) {
        const items = this.#getLocalItems();
        items.delete(id);
        localStorageService.setObject(this.#cartKey, [...items.entries()]);
    }

    addItemToCart({ id, count = 1 }: { id: string; count: number }): void {
        const items = this.#getLocalItems();
        let existingCount = 0;
        const exists = items.has(id);
        if (exists) {
            existingCount = items.get(id)!;
        }
        items.set(id, existingCount + count);
        this.#setLocalItems(items);
    }

    async getCartItems(): Promise<AppResponse<Partial<CartItem>[]>> {
        const items = this.#getLocalItems();
        const { data } = await axiosAdapter.doGet<AppResponse<Products>>({
            url: '/v1/catalog/products',
            queryParams: {
                productCodes: [...items.keys()].join(',')
            }
        });

        const cartItems = productMapper.mapResponseToProductItems(data).data.map(item => {
            return {
                product: item,
                count: items.get(item.code)
            };
        });

        return {
            data: cartItems
        };
    }

    removeCartItem(code: string) {
        this.#removeLocalItem(code);
    }
}

export const cartService = new CartService();
