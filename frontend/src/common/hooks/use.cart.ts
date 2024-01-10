import { useSelector } from 'react-redux';
import { RootState } from '../../store/types/root.state';
import { CartItem } from '../../scenes/Cart/types/cart.state';
import { getCart } from '../helpers/get.state.helper';

const useCart = () => {
    const cart = useSelector((rootState: RootState) => getCart(rootState).items);
    const totalProductPrice = (item: CartItem) => {
        return Number(item.product.price) * item.count;
    };

    return {
        count: cart.length,
        sum: cart.reduce((sum, item) => totalProductPrice(item) + sum, 0)
    };
};
export default useCart;
