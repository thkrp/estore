import { BottomMenu, CatalogMenu, GeneralInfo, PublicUser, TopMenu } from 'app-shared';

export type Menu = {
    bottom: BottomMenu[];
    top: TopMenu;
    catalog: CatalogMenu;
};

export interface AppState {
    isLoading: boolean;
    user: PublicUser | null;
    menu?: Menu;
    info?: GeneralInfo;
    netWorkError?: boolean;
}
