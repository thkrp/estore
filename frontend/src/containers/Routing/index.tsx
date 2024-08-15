import React, { FC, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { CatalogMenu, CatalogMenuItem, GeneralInfo, TopMenu, TopMenuItem } from 'app-shared';
import { appInitRoutine } from '../../store/app/routines';
import { Home, Catalog, Detail } from '../../scenes';
import HomeLayout from '../../layouts/Home';
import { Menu } from '../../store/app/types/app.state';
import { RootState } from '../../store/types/root.state';
import MainLayout from '../../layouts/Main';
import Cart from '../../scenes/Cart';
import { AdminRoutes, Routes } from '../../common/enums/routing/routes';
import Authorization from '../../scenes/Authorization';
import Admin from '../../scenes/Admin';
import PrivateRoutes from './PrivateRoutes';
import AdminLayout from '../../layouts/Admin';
import UserManagement from '../../scenes/Admin/UserManagement';

type Props = {
    isLoading: boolean;
    appInit: () => void;
    info?: GeneralInfo;
    menu: Partial<Menu>;
    netWorkError?: boolean;
};

const Routing: FC<Props> = ({ isLoading, menu, info, appInit, netWorkError }) => {
    const isCanceled = useRef(false);
    useEffect(() => {
        if (!isCanceled.current) {
            isCanceled.current = true;
            appInit();
        }
    }, []);

    if (isLoading) {
        return null;
    }

    if (netWorkError) {
        return <>Something went wrong. Try to reload this page later.</>;
    }

    const addCatalogRoutes = (sections: CatalogMenu) => {
        if (!sections) {
            return null;
        }
        return Object.entries(sections).map(([key, value]: [string, CatalogMenuItem]) => {
            if (value.children) {
                return (
                    <Route key={value.code} path={value.code}>
                        <Route index element={<Catalog subSections={value.children} />} />
                        {addCatalogRoutes(value.children)}
                    </Route>
                );
            }

            return (
                <React.Fragment key={value.code}>
                    <Route path={`${key}`} element={<Catalog />} />
                    {value.id && <Route path={`${key}/:id`} element={<Detail />} />}
                </React.Fragment>
            );
        });
    };

    const addPageRoutes = (sections: TopMenu) => {
        if (!sections) {
            return null;
        }
        return Object.entries(sections).map(([key, value]: [string, TopMenuItem]) => (
            <React.Fragment key={value.code}>
                <Route path={`${key}`} element={<div>{value.name}</div>} />
            </React.Fragment>
        ));
    };

    return (
        <Router>
            <ReactRoutes>
                <Route path={Routes.baseUrl} element={<HomeLayout info={info} menu={menu} />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path={Routes.baseUrl} element={<MainLayout info={info} menu={menu} />}>
                    {menu.top && addPageRoutes(menu.top)}
                </Route>
                <Route path={Routes.catalog} element={<MainLayout info={info} menu={menu} />}>
                    <Route index element={<Catalog subSections={menu.catalog} />} />
                    {menu.catalog && addCatalogRoutes(menu.catalog)}
                </Route>
                <Route path={Routes.cart} element={<MainLayout info={info} menu={menu} />}>
                    <Route index element={<Cart />} />
                </Route>
                <Route path={Routes.authorization} index element={<Authorization />} />
                <Route element={<PrivateRoutes />}>
                    <Route path={Routes.adminBaseUrl} element={<AdminLayout />}>
                        <Route index element={<Admin />} />
                        <Route path={AdminRoutes.userManagement} element={<UserManagement />} />
                        <Route path={`${AdminRoutes.userManagement}/:id`} element={<div>user id</div>} />
                    </Route>
                </Route>
                <Route path="*" element={<p>404!</p>} />
            </ReactRoutes>
        </Router>
    );
};

const mapStateToProps = (rootState: RootState) => ({
    isLoading: rootState.app.isLoading,
    menu: {
        bottom: rootState.app.menu?.bottom,
        top: rootState.app.menu?.top,
        catalog: rootState.app.menu?.catalog
    },
    info: rootState.app.info,
    netWorkError: rootState.app.netWorkError
});

const mapDispatchToProps = {
    appInit: appInitRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
