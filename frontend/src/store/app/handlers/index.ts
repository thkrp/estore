import { AxiosError } from 'app-shared/node_modules/axios';
import { AppState } from '../types/app.state';

export const appInitHandler = (state: AppState, { info, menu }: Partial<AppState>) => ({
    ...state,
    info,
    menu
});

export const appInitFailureHandler = (state: AppState, e: AxiosError) => ({
    ...state,
    netWorkError: e.code === 'ERR_NETWORK'
});
