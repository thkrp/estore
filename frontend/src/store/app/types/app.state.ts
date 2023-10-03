import { BottomMenu, CatalogMenu, GeneralInfo, TopMenu } from 'app-shared';

type User = {
    id: string;
};

export type Menu = {
    bottom: BottomMenu[];
    top: TopMenu;
    catalog: CatalogMenu;
};

export interface AppState {
    isLoading: boolean;
    user: User | null;
    menu?: Menu;
    info?: GeneralInfo;
    netWorkError?: boolean;
}
