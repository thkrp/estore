import { combineReducers } from '@reduxjs/toolkit';
import AppReducer from './app/reducer';
import CatalogReducer from '../scenes/Catalog/reducer';
import HomeReducer from '../scenes/Home/reducer';
import CartReducer from '../scenes/Cart/reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    catalog: CatalogReducer,
    home: HomeReducer,
    cart: CartReducer
});

export default rootReducer;
