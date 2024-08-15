import { AppState } from '../app/types/app.state';
import { HomeState } from '../../scenes/Home/types/home.state';
import { CatalogState } from '../../scenes/Catalog/types/catalog.state';
import { CartState } from '../../scenes/Cart/types/cart.state';
import { AdminState } from '../../scenes/Admin/types/admin.state';

export interface RootState {
    app: AppState;
    home: HomeState;
    catalog: CatalogState;
    cart: CartState;
    admin: AdminState;
}
