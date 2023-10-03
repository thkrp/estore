import { createRoutine } from 'redux-saga-routines';

export const getArrivalsRoutine = createRoutine('home/get-arrivals');

export const getDiscountedRoutine = createRoutine('home/get-discounted');

export const getBestSalesRoutine = createRoutine('home/get-best-sales');

export const getBrandsRoutine = createRoutine('home/get-brands');

export const triggerItemsForSectionLoaderRoutine = createRoutine('home/trigger-items-for-section-loader');
