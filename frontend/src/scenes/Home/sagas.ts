import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AppResponse, Product, Products } from 'app-shared';
import { Action } from 'redux-actions';
import {
    getArrivalsRoutine,
    getBestSalesRoutine,
    getDiscountedRoutine,
    triggerItemsForSectionLoaderRoutine,
    getBrandsRoutine
} from './routines';
import { catalogService } from '../../services/catalog';
import { StateElements } from '../../common/enums/state.elements';

function* getArrivalsHandler(action: Action<number>) {
    try {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: true,
                element: StateElements.arrivals
            })
        );
        const page = action.payload;
        const { data }: AppResponse<Products> = yield call(catalogService.getArrivals, page);
        yield put(
            getArrivalsRoutine.success({
                section: StateElements.arrivals,
                items: data?.items,
                total_count: data?.total_count,
                page,
                pageSize: data?.pageSize
            })
        );
    } catch (e) {
        console.error(e);
    } finally {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: false,
                element: StateElements.arrivals
            })
        );
    }
}

function* watchGetArrivals() {
    yield takeEvery(getArrivalsRoutine.trigger, getArrivalsHandler);
}

function* getDiscountedHandler(action: Action<number>) {
    try {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: true,
                element: StateElements.discounted
            })
        );
        const page = action.payload;
        const { data }: AppResponse<Products> = yield call(catalogService.getDiscounted, page);
        yield put(
            getDiscountedRoutine.success({
                section: StateElements.discounted,
                items: data?.items,
                total_count: data?.total_count,
                page,
                pageSize: data?.pageSize
            })
        );
    } catch (e) {
        console.error(e);
    } finally {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: false,
                element: StateElements.discounted
            })
        );
    }
}

function* watchGetDiscounted() {
    yield takeEvery(getDiscountedRoutine.trigger, getDiscountedHandler);
}

function* getBestSalesHandler() {
    try {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: true,
                element: StateElements.bestSales
            })
        );
        const { data }: AppResponse<Product[]> = yield call(catalogService.getBestSales);
        yield put(
            getBestSalesRoutine.success({
                items: data,
                section: StateElements.bestSales
            })
        );
    } catch (e) {
        console.error(e);
    } finally {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: false,
                element: StateElements.bestSales
            })
        );
    }
}

function* watchGetBestSales() {
    yield takeEvery(getBestSalesRoutine.trigger, getBestSalesHandler);
}

function* getBrandsHandler() {
    try {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: true,
                element: StateElements.brands
            })
        );
        const { data }: AppResponse<Product[]> = yield call(catalogService.getBrands);
        yield put(
            getBrandsRoutine.success({
                items: data,
                section: StateElements.brands
            })
        );
    } catch (e) {
        console.error(e);
    } finally {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: false,
                element: StateElements.brands
            })
        );
    }
}

function* watchGetBrands() {
    yield takeEvery(getBrandsRoutine.trigger, getBrandsHandler);
}

export default function* homeSaga() {
    yield all([watchGetArrivals(), watchGetDiscounted(), watchGetBestSales(), watchGetBrands()]);
}
