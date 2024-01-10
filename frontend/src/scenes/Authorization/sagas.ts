import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { Login } from 'app-shared';
import { LoginRoutine } from './routines';
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
export default function* authSaga() {
    yield all([watchLoginHandler()]);
}
