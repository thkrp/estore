import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { Login } from 'app-shared';
import { LoginRoutine, LogoutRoutine } from './routines';
import { authService } from '../../services/auth';
import { appUserUpdateRoutine } from '../../store/app/routines';

function* loginHandler(action: Action<Login>) {
    try {
        const { payload } = action;
        const { data } = yield call([authService, authService.login], payload);
        const user = data?.user || null;
        yield put(appUserUpdateRoutine.success(user));
    } catch (e) {
        console.error(e);
    }
}

function* watchLoginHandler() {
    yield takeEvery(LoginRoutine.trigger, loginHandler);
}

function* logoutHandler() {
    try {
        yield call([authService, authService.logout]);
        yield put(appUserUpdateRoutine.success(null));
    } catch (e) {
        console.error(e);
    }
}

function* watchLogoutHandler() {
    yield takeEvery(LogoutRoutine.trigger, logoutHandler);
}

export default function* authSaga() {
    yield all([watchLoginHandler(), watchLogoutHandler()]);
}
