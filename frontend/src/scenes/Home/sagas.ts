import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AppResponse, Product } from 'app-shared';
import {
    getArrivalsRoutine,
    getBestSalesRoutine,
    getDiscountedRoutine,
    triggerItemsForSectionLoaderRoutine,
    getBrandsRoutine
} from './routines';
import { catalogService } from '../../services/catalog.service';
import { StateElements } from '../../common/enums/state.elements';

function* getArrivalsHandler() {
    try {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: true,
                element: StateElements.arrivals
            })
        );
        const { data }: AppResponse<Product[]> = yield call(catalogService.getArrivals);
        yield put(
            getArrivalsRoutine.success({
                items: data,
                section: StateElements.arrivals
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

function* getDiscountedHandler() {
    try {
        yield put(
            triggerItemsForSectionLoaderRoutine.success({
                isLoading: true,
                element: StateElements.discounted
            })
        );
        const { data }: AppResponse<Product[]> = yield call(catalogService.getDiscounted);
        yield put(
            getArrivalsRoutine.success({
                items: data,
                section: StateElements.discounted
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
    yield takeEvery(getArrivalsRoutine.trigger, getBestSalesHandler);
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
