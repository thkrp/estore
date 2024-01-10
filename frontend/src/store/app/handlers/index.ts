import { AxiosError } from 'app-shared/node_modules/axios';
import { PublicUser } from 'app-shared';
import { AppState } from '../types/app.state';

export const appInitHandler = (
    state: AppState,
    { info, menu, user }: Partial<AppState> & { user: PublicUser | null }
) => ({
    ...state,
    info,
    menu,
    user
});

export const appInitFailureHandler = (state: AppState, e: AxiosError) => ({
    ...state,
    netWorkError: e.code === 'ERR_NETWORK'
});

export const appUserUpdateHandler = (state: AppState, user: PublicUser) => ({
    ...state,
    user
});
