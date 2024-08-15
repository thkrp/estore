import { all } from 'redux-saga/effects';
import usersSaga from './UserManagement/sagas';

export default function* adminSaga() {
    yield all([usersSaga()]);
}
