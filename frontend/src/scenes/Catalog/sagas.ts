import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AppResponse, FilterParams, Product } from 'app-shared';
import { Action } from 'redux-actions';
import { catalogService } from '../../services/catalog.service';
import {
    getDetailedProductRoutine,
    getProductsRoutine,
    getViewedRoutine,
    triggerProductsLoaderRoutine
} from './routines';
import { StateElements } from '../../common/enums/state.elements';

function* getViewedHandler() {
    try {
        /** TODO: Add getting viewed products instead of arrivals */
        const { data }: AppResponse<Product[]> = yield call(catalogService.getArrivals);
        const viewed = data || [];
        yield put(getViewedRoutine.success([...viewed, ...viewed]));
    } catch (e) {
        console.error(e);
    }
}

function* watchGetViewed() {
    yield takeEvery(getViewedRoutine.trigger, getViewedHandler);
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
    yield all([watchGetViewed(), watchGetDetailed(), watchGetProducts()]);
}
