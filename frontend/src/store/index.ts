import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { env } from '../env';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: env.isDevelopment,
    enhancers: defaultEnhancers => [...defaultEnhancers]
});

sagaMiddleware.run(rootSaga);

export default store;
