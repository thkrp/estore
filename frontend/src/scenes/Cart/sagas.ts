import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import {
    addItemToCartRoutine,
    getCartItemsRoutine,
    removeCartItemRoutine,
    triggerCartItemsLoaderRoutine,
    updateCartItemsRoutine
} from './routines';
import { cartService } from '../../services/cart';
import { CartItem } from './types/cart.state';

function* getCartItemsHandler() {
    try {
        yield put(triggerCartItemsLoaderRoutine.success(true));
        const { data } = yield call([cartService, cartService.getCartItems]);
        yield put(getCartItemsRoutine.success(data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(triggerCartItemsLoaderRoutine.success(false));
    }
}

function* watchGetCartItems() {
    yield takeEvery(getCartItemsRoutine.trigger, getCartItemsHandler);
}

function* addItemToCartHandler(action: Action<CartItem>) {
    try {
        const { product, count } = action.payload;
        yield call([cartService, cartService.addItemToCart], { id: product.code, count });
        yield put(updateCartItemsRoutine.success({ product, count }));
    } catch (e) {
        console.error(e);
    }
}

function* watchAddItemToCart() {
    yield takeEvery(addItemToCartRoutine.trigger, addItemToCartHandler);
}

function* removeCartItemHandler(action: Action<string>) {
    try {
        const code = action.payload;
        yield call([cartService, cartService.removeCartItem], code);
        yield put(removeCartItemRoutine.success(code));
    } catch (e) {
        console.error(e);
    }
}

function* watchRemoveCartItem() {
    yield takeEvery(removeCartItemRoutine.trigger, removeCartItemHandler);
}

export default function* cartSaga() {
    yield all([watchGetCartItems(), watchAddItemToCart(), watchRemoveCartItem()]);
}
