import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AppResponse, FilterOptions, UpdatePublicUser, UserList } from 'app-shared';
import { Action } from 'redux-actions';
import { userService } from '../../../services/user';
import { deleteUsersRoutine, getUsersRoutine, triggerUsersLoaderRouting, updateUsersRoutine } from './routines';

function* getUsersHandler({ payload: filterOptions }: Action<FilterOptions>) {
    try {
        yield put(triggerUsersLoaderRouting.success(true));
        const { data }: AppResponse<UserList> = yield call(userService.getUsers, filterOptions) || {};
        yield put(getUsersRoutine.success(data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(triggerUsersLoaderRouting.success(false));
    }
}

function* watchGetUsers() {
    yield takeEvery(getUsersRoutine.trigger, getUsersHandler);
}

function* deleteUsersHandler(action: Action<string[]>) {
    try {
        yield put(triggerUsersLoaderRouting.success(true));
        const userIds = action.payload;
        yield call(userService.deleteUsers, userIds);
        yield put(deleteUsersRoutine.success(userIds));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(triggerUsersLoaderRouting.success(false));
    }
}

function* watchDeleteUsers() {
    yield takeEvery(deleteUsersRoutine.trigger, deleteUsersHandler);
}

function* updateUsersHandler(action: Action<UpdatePublicUser[]>) {
    try {
        yield put(triggerUsersLoaderRouting.success(true));
        const users = action.payload;
        yield call(userService.updateUsers, users);
        yield put(updateUsersRoutine.success(users));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(triggerUsersLoaderRouting.success(false));
    }
}

function* watchUpdateUsers() {
    yield takeEvery(updateUsersRoutine.trigger, updateUsersHandler);
}

export default function* usersSaga() {
    yield all([watchGetUsers(), watchDeleteUsers(), watchUpdateUsers()]);
}
