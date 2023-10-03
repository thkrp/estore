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

    const addPagesRoutes = (sections: TopMenu) => {
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
                <Route path="/" element={<HomeLayout info={info} menu={menu} />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/" element={<MainLayout info={info} menu={menu} />}>
                    {menu.top && addPagesRoutes(menu.top)}
                </Route>
                <Route path="/catalog" element={<MainLayout info={info} menu={menu} />}>
                    <Route index element={<Catalog subSections={menu.catalog} />} />
                    {menu.catalog && addCatalogRoutes(menu.catalog)}
                </Route>
                <Route path="/cart" element={<MainLayout info={info} menu={menu} />}>
                    <Route index element={<div>Cart</div>} />
                </Route>
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
