import { createRoutine } from 'redux-saga-routines';

export const getViewedRoutine = createRoutine('catalog/get-viewed');

export const addViewedRoutine = createRoutine('catalog/add-viewed');

export const getDetailedProductRoutine = createRoutine('catalog/get-detailed-product');

export const getProductsRoutine = createRoutine('catalog/get-products');

export const triggerProductsLoaderRoutine = createRoutine('catalog/trigger-products-loader');
