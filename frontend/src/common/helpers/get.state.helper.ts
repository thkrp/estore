import { RootState } from '../../store/types/root.state';

export const getAppState = (state: RootState) => state.app;

export const getCatalogState = (state: RootState) => state.catalog;

export const getCart = (state: RootState) => state.cart;
