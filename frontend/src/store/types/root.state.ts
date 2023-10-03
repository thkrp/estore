import { AppState } from '../app/types/app.state';
import { HomeState } from '../../scenes/Home/types/home.state';
import { CatalogState } from '../../scenes/Catalog/types/catalog.state';

export interface RootState {
    app: AppState;
    home: HomeState;
    catalog: CatalogState;
}
