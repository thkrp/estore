import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../../store/types/reducer.handlers';
import { HomeState } from './types/home.state';
import {
    getArrivalsRoutine,
    getBestSalesRoutine,
    getBrandsRoutine,
    getDiscountedRoutine,
    triggerItemsForSectionLoaderRoutine
} from './routines';
import { sectionItemsHandler } from './handlers';
import { triggerStatePropertyLoaderHandler } from '../../store/handlers';

const initialState: HomeState = {
    arrivals: {
        isLoading: true,
        items: []
    },
    discounted: {
        isLoading: true,
        items: []
    },
    bestSales: {
        isLoading: true,
        items: []
    },
    brands: {
        isLoading: true,
        items: []
    }
};

const handlers: ReducerHandlers<HomeState> = {
    [getArrivalsRoutine.SUCCESS]: sectionItemsHandler,
    [getDiscountedRoutine.SUCCESS]: sectionItemsHandler,
    [getBestSalesRoutine.SUCCESS]: sectionItemsHandler,
    [getBrandsRoutine.SUCCESS]: sectionItemsHandler,
    [triggerItemsForSectionLoaderRoutine.SUCCESS]: triggerStatePropertyLoaderHandler
};

const HomeReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): HomeState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default HomeReducer;
