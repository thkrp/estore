import React, { Fragment, useEffect } from 'react';
import { CatalogMenu, FilterParams, Product } from 'app-shared';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from '../../components';
import { getProductsRoutine } from './routines';
import { useSection } from '../../common/hooks/use.section';
import { RootState } from '../../store/types/root.state';

type Props = {
    subSections?: CatalogMenu;
    getProducts: (queryParams: FilterParams) => void;
    products?: Product[];
    isLoading: boolean;
};

const Catalog = ({ subSections, getProducts, products, isLoading }: Props) => {
    const section = useSection();
    useEffect(() => {
        if (section) {
            getProducts({ section });
        }
    }, [section]);

    return (
        <>
            <Helmet>
                <title>Catalog {section ? `- ${section}` : ''}</title>
            </Helmet>
            <div>
                {!!subSections && (
                    <div>
                        <div>Sections</div>
                        {Object.entries(subSections).map(([, el]) => (
                            <Fragment key={el.code}>
                                <Link to={el.url}>{el.name}</Link>
                                <br />
                            </Fragment>
                        ))}
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )}
                {!!products?.length && !isLoading && (
                    <div>
                        <div>Products</div>
                        {products?.map(el => (
                            <Fragment key={el.code}>
                                <Link to={el.url}>{el.name}</Link>
                                <br />
                            </Fragment>
                        ))}
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (rootState: RootState) => ({
    products: rootState.catalog.products?.items,
    isLoading: rootState.catalog.products?.isLoading
});

const mapDispatchToProps = {
    getProducts: getProductsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
