import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CatalogMenu } from 'app-shared';
import { RootState } from '../../store/types/root.state';
import { Breadcrumb } from '../types/breadcrumbs';

const BREADCRUMBS_MAX_LENGTH = 3;

type Accumulator = {
    breadcrumbs: Breadcrumb[];
    section: {
        children?: CatalogMenu;
    };
};

const useBreadcrumbs = () => {
    const { id } = useParams();
    const { pathname, key } = useLocation();
    const getAppState = (state: RootState) => state.app;
    const getCatalogState = (state: RootState) => state.catalog;
    const sections = useSelector((rootState: RootState) => getAppState(rootState).menu?.catalog);
    const product = useSelector((rootState: RootState) => getCatalogState(rootState).detailed);

    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const updateBreadcrumbs = () => {
        if (breadcrumbs.length && id && product?.code && product?.code === id) {
            setBreadcrumbs(prevState => {
                const newState = [...prevState];
                const { name, code, url } = product;
                newState.splice(newState.length - 1, 1);
                newState.push({ name, code, url });
                return newState;
            });
        }
    };

    useEffect(() => {
        updateBreadcrumbs();
    }, [id, product, breadcrumbs.length]);

    const getChildrenCategories = (children: CatalogMenu): Breadcrumb[] =>
        Object.entries(children).map(([, value]) => ({
            name: value?.name,
            code: value?.code,
            url: value?.url || '/'
        }));

    const createBreadcrumbs = () => {
        const splitPath = pathname.split('/');
        const { breadcrumbs: bc } = splitPath.reduce(
            (acc: Accumulator, element): Accumulator => {
                const currentSection = acc.section.children && acc.section.children[element];
                if (!currentSection) {
                    return acc;
                }
                const children = currentSection.children && getChildrenCategories(currentSection.children);

                return {
                    breadcrumbs: [
                        ...acc.breadcrumbs,
                        {
                            name: currentSection?.name,
                            code: currentSection?.code,
                            url: currentSection?.url || '/',
                            children
                        }
                    ],
                    section: currentSection
                };
            },
            { breadcrumbs: [], section: { children: sections } }
        );
        if (id) {
            bc.push({ name: undefined, code: '', url: '' });
        }

        if (bc.length >= BREADCRUMBS_MAX_LENGTH) {
            bc.splice(0, bc.length - BREADCRUMBS_MAX_LENGTH);
        }
        setBreadcrumbs(bc);
    };

    useEffect(() => {
        createBreadcrumbs();
    }, [key]);

    return breadcrumbs;
};

export default useBreadcrumbs;
