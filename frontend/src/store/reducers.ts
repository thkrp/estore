import { combineReducers } from '@reduxjs/toolkit';
import AppReducer from './app/reducer';
import CatalogReducer from '../scenes/Catalog/reducer';
import HomeReducer from '../scenes/Home/reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    catalog: CatalogReducer,
    home: HomeReducer
});

export default rootReducer;
