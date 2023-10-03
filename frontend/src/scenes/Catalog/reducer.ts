import { Routine } from 'redux-saga-routines';
import { CatalogState } from './types/catalog.state';
import { ReducerHandlers } from '../../store/types/reducer.handlers';
import {
    getDetailedProductRoutine,
    getProductsRoutine,
    getViewedRoutine,
    triggerProductsLoaderRoutine
} from './routines';
import { detailProductUpdateHandler, productsUpdateHandler, viewedProductsUpdateHandler } from './handlers';
import { triggerStatePropertyLoaderHandler } from '../../store/handlers';

const initialState: CatalogState = {
    viewed: [],
    products: {
        isLoading: true
    }
};

const handlers: ReducerHandlers<CatalogState> = {
    [getViewedRoutine.SUCCESS]: viewedProductsUpdateHandler,
    [getDetailedProductRoutine.SUCCESS]: detailProductUpdateHandler,
    [getProductsRoutine.SUCCESS]: productsUpdateHandler,
    [triggerProductsLoaderRoutine.SUCCESS]: triggerStatePropertyLoaderHandler
};

const CatalogReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): CatalogState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default CatalogReducer;
