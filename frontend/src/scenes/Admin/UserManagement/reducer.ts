import { Routine } from 'redux-saga-routines';
import { deleteUsersRoutine, getUsersRoutine, triggerUsersLoaderRouting, updateUsersRoutine } from './routines';
import { ReducerHandlers } from '../../../store/types/reducer.handlers';
import { UserManagementState } from './types/user.management.state';
import { triggerLoaderHandler } from '../../../store/handlers';
import { deleteUsersHandler, updateUserListHandler, updateUsersHandler } from './handlers';

const initialState: UserManagementState = {
    isLoading: true,
    users: [],
    totalCount: 0,
    pageSize: 0
};
const handlers: ReducerHandlers<UserManagementState> = {
    [triggerUsersLoaderRouting.SUCCESS]: triggerLoaderHandler,
    [getUsersRoutine.SUCCESS]: updateUserListHandler,
    [deleteUsersRoutine.SUCCESS]: deleteUsersHandler,
    [updateUsersRoutine.SUCCESS]: updateUsersHandler
};
const UserManagementReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): UserManagementState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default UserManagementReducer;
