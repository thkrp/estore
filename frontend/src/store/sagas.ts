import { all } from 'redux-saga/effects';
import appInfoSaga from './app/sagas';
import catalogSaga from '../scenes/Catalog/sagas';
import homeSaga from '../scenes/Home/sagas';
import cartSaga from '../scenes/Cart/sagas';
import authSaga from '../scenes/Authorization/sagas';
import adminSaga from '../scenes/Admin/sagas';

export default function* rootSaga() {
    yield all([appInfoSaga(), catalogSaga(), homeSaga(), cartSaga(), authSaga(), adminSaga()]);
}
