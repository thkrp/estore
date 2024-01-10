import { createRoutine } from 'redux-saga-routines';

export const addItemToCartRoutine = createRoutine('cart/add-item-to-cart');

export const removeCartItemRoutine = createRoutine('cart/remove-cart-item');

export const updateCartItemsRoutine = createRoutine('cart/update-cart-items');

export const getCartItemsRoutine = createRoutine('cart/get-cart-items');

export const triggerCartItemsLoaderRoutine = createRoutine('cart/trigger-get-cart-items');
