import { mockData } from 'app-shared';
import { AxiosError } from 'app-shared/node_modules/axios';
import { appInitHandler, appInitFailureHandler } from '../../../store/app/handlers';
import { Menu } from '../../../store/app/types/app.state';

describe('app handlers', () => {
    it('appInit handler should return menu and general info data', () => {
        const state = {
            isLoading: true,
            user: null
        };
        const { catalogMenu, topMenu, bottomMenu, generalInformation: info } = mockData;
        const menu: Menu = {
            catalog: catalogMenu,
            top: topMenu,
            bottom: bottomMenu
        };

        expect(appInitHandler(state, { menu, info, user: null })).toEqual({ ...state, menu, info });
    });

    it('appInitFailure handler should return netWorkError - true if the error code is ERR_NETWORK', () => {
        const state = {
            isLoading: true,
            user: null
        };
        expect(appInitFailureHandler(state, { code: 'ERR_NETWORK' } as AxiosError)).toEqual({
            ...state,
            netWorkError: true
        });
    });
});
