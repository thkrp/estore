import { createRoutine } from 'redux-saga-routines';

export const triggerLoaderRoutine = createRoutine('app/trigger-loader');

export const appInitRoutine = createRoutine('app/app-init');

export const appUserUpdateRoutine = createRoutine('app/app-user-update');
