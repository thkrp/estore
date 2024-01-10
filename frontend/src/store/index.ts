import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { env } from '../env';
import { axiosAdapter } from '../common/helpers/axios-adatpter';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: env.isDevelopment,
    enhancers: defaultEnhancers => [...defaultEnhancers]
});

sagaMiddleware.run(rootSaga);
axiosAdapter.injectStore(store);
export default store;
