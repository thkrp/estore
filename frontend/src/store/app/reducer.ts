import { Routine } from 'redux-saga-routines';
import { appInitRoutine, appUserUpdateRoutine, triggerLoaderRoutine } from './routines';
import { AppState } from './types/app.state';
import { appInitHandler, appInitFailureHandler, appUserUpdateHandler } from './handlers';
import { ReducerHandlers } from './types/reducer.handlers';
import { triggerLoaderHandler } from '../handlers';

const initialState: AppState = {
    isLoading: true,
    user: null
};

const handlers: ReducerHandlers<AppState> = {
    [appInitRoutine.SUCCESS]: appInitHandler,
    [appInitRoutine.FAILURE]: appInitFailureHandler,
    [triggerLoaderRoutine.SUCCESS]: triggerLoaderHandler,
    [appUserUpdateRoutine.SUCCESS]: appUserUpdateHandler
};

const AppReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): AppState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default AppReducer;
