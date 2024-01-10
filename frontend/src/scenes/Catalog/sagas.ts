import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AppResponse, FilterParams, Product } from 'app-shared';
import { Action } from 'redux-actions';
import { catalogService } from '../../services/catalog';
import {
    addViewedRoutine,
    getDetailedProductRoutine,
    getProductsRoutine,
    getViewedRoutine,
    triggerProductsLoaderRoutine
} from './routines';
import { StateElements } from '../../common/enums/state.elements';
import { localStorageService } from '../../services/local-storage';

function* getViewedHandler() {
    try {
        const { data }: AppResponse<Product[]> = yield call([catalogService, catalogService.getViewedProducts]);
        yield put(getViewedRoutine.success(data));
    } catch (e) {
        console.error(e);
    }
}

function* watchGetViewed() {
    yield takeEvery(getViewedRoutine.trigger, getViewedHandler);
}

function* addViewedHandler(action: Action<Product>) {
    try {
        const product = action.payload;
        yield call([localStorageService, localStorageService.addViewedItem], product.code);
    } catch (e) {
        console.error(e);
    }
}

function* watchAddViewed() {
    yield takeEvery(addViewedRoutine.trigger, addViewedHandler);
}

function* getProductsHandler(action: Action<FilterParams>) {
    try {
        yield put(
            triggerProductsLoaderRoutine.success({
                isLoading: true,
                element: StateElements.products
            })
        );
        const query = action.payload;
        const { data } = yield catalogService.getProducts(query);
        yield put(getProductsRoutine.success(data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(
            triggerProductsLoaderRoutine.success({
                isLoading: false,
                element: StateElements.products
            })
        );
    }
}

function* watchGetProducts() {
    yield takeEvery(getProductsRoutine.trigger, getProductsHandler);
}

function* getDetailedHandler(action: Action<string>) {
    try {
        const code = action.payload;
        const { data } = yield catalogService.getDetailedProduct(code);
        yield put(getDetailedProductRoutine.success(data));
    } catch (e) {
        console.error(e);
    }
}

function* watchGetDetailed() {
    yield takeLatest(getDetailedProductRoutine.trigger, getDetailedHandler);
}

export default function* catalogSaga() {
    yield all([watchGetViewed(), watchGetDetailed(), watchGetProducts(), watchAddViewed()]);
}
