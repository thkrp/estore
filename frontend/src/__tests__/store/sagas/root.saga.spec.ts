import { all } from 'redux-saga/effects';
import rootSaga from '../../../store/sagas';
import appInfoSaga from '../../../store/app/sagas';
import catalogSaga from '../../../scenes/Catalog/sagas';
import homeSaga from '../../../scenes/Home/sagas';

it('rootSaga should run all sagas', () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(all([appInfoSaga(), catalogSaga(), homeSaga()]));
});
