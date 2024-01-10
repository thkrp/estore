import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../../store/types/reducer.handlers';
import {
    getCartItemsRoutine,
    removeCartItemRoutine,
    triggerCartItemsLoaderRoutine,
    updateCartItemsRoutine
} from './routines';
import { getCartItemsHandler, removeCartItemHandler, updateCartItemsHandler } from './handlers';
import { triggerLoaderHandler } from '../../store/handlers';
import { CartState } from './types/cart.state';

const initialState: CartState = {
    isLoading: false,
    items: []
};
const handlers: ReducerHandlers<CartState> = {
    [triggerCartItemsLoaderRoutine.SUCCESS]: triggerLoaderHandler,
    [getCartItemsRoutine.SUCCESS]: getCartItemsHandler,
    [updateCartItemsRoutine.SUCCESS]: updateCartItemsHandler,
    [removeCartItemRoutine.SUCCESS]: removeCartItemHandler
};
const CartReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): CartState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default CartReducer;
