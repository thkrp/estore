import { createRoutine } from 'redux-saga-routines';

export const triggerUsersLoaderRouting = createRoutine('admin/users/trigger-loader');
export const getUsersRoutine = createRoutine('admin/users/get-users');
export const deleteUsersRoutine = createRoutine('admin/users/delete-users');
export const updateUsersRoutine = createRoutine('admin/users/update-users');
