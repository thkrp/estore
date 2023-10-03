import { all } from 'redux-saga/effects';
import appInfoSaga from './app/sagas';
import catalogSaga from '../scenes/Catalog/sagas';
import homeSaga from '../scenes/Home/sagas';

export default function* rootSaga() {
    yield all([appInfoSaga(), catalogSaga(), homeSaga()]);
}
