import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AppResponse, BottomMenu, CatalogMenu, GeneralInfo, TopMenu } from 'app-shared';
import { appInitRoutine, triggerLoaderRoutine } from './routines';
import { appService } from '../../services/app.service';

function* appInitHandler() {
    try {
        yield put(triggerLoaderRoutine.success(true));
        const { data: info }: AppResponse<GeneralInfo> = yield call(appService.fetchAppInfo);
        const { data: topMenu }: AppResponse<TopMenu> = yield call(appService.fetchTopMenu);
        const { data: bottomMenu }: AppResponse<BottomMenu> = yield call(appService.fetchBottomMenu);
        const { data: catalogMenu }: AppResponse<CatalogMenu> = yield call(appService.fetchCatalogMenu);
        yield put(
            appInitRoutine.success({
                info,
                menu: {
                    top: topMenu,
                    bottom: bottomMenu,
                    catalog: catalogMenu
                }
            })
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        yield put(appInitRoutine.failure(e));
    } finally {
        yield put(triggerLoaderRoutine.success(false));
    }
}

function* watchAppInit() {
    yield takeEvery(appInitRoutine.trigger, appInitHandler);
}

export default function* appInfoSaga() {
    yield all([watchAppInit()]);
}
