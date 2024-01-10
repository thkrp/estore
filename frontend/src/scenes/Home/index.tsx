import React, { FC, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Product } from 'app-shared';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { BestSales, Brands, Tabs, ViewedProducts } from './components';
import { RootState } from '../../store/types/root.state';
import { getArrivalsRoutine, getBestSalesRoutine, getBrandsRoutine, getDiscountedRoutine } from './routines';
import { BrandsOfSection, ProductsOfSection } from './types/home.state';
import { WrapperStyled } from './index.styles';
import { getViewedRoutine } from '../Catalog/routines';
import { StateElements } from '../../common/enums/state.elements';
import { TabContent } from './types/tab.content';

type Props = {
    arrivals: ProductsOfSection;
    discounted: ProductsOfSection;
    bestSales: ProductsOfSection;
    viewed: Product[];
    brands: BrandsOfSection;
    getArrivals: (nextPage?: number) => void;
    getDiscounted: (nextPage?: number) => void;
    getBestSales: () => void;
    getViewed: () => void;
    getBrands: () => void;
};

const Home: FC<Props> = ({
    arrivals,
    discounted,
    getArrivals,
    getDiscounted,
    getBestSales,
    bestSales,
    viewed,
    getViewed,
    brands,
    getBrands
}) => {
    const isCanceled = useRef(false);
    const intl = useIntl();
    const tabs = [
        {
            code: StateElements.arrivals,
            title: intl.formatMessage({ id: 'arrivals' })
        },
        {
            code: StateElements.discounted,
            title: intl.formatMessage({ id: 'discounted' })
        }
    ];

    useEffect(() => {
        if (!isCanceled.current) {
            isCanceled.current = true;
            getArrivals();
            getDiscounted();
            getBestSales();
            getViewed();
            getBrands();
        }
    }, []);

    const tabContent: TabContent = {
        [StateElements.arrivals]: arrivals,
        [StateElements.discounted]: discounted
    };

    const loadMore: Partial<{ [key in StateElements]: () => void }> = {
        [StateElements.arrivals]: () => {
            getArrivals(arrivals.page + 1);
        },
        [StateElements.discounted]: () => {
            getDiscounted(discounted.page + 1);
        }
    };

    const onLoadMore = (code: StateElements) => {
        loadMore[code]?.();
    };

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <WrapperStyled>
                <Tabs tabs={tabs} tabContent={tabContent} onLoadMore={onLoadMore} />
                <BestSales products={bestSales.items} isLoading={bestSales.isLoading} />
                {!!viewed.length && <ViewedProducts slides={viewed} title={intl.formatMessage({ id: 'viewed' })} />}
                <Brands slides={brands.items} title={intl.formatMessage({ id: 'brands' })} />
            </WrapperStyled>
        </>
    );
};

const mapStateToProps = (rootState: RootState) => ({
    arrivals: rootState.home.arrivals,
    discounted: rootState.home.discounted,
    bestSales: rootState.home.bestSales,
    brands: rootState.home.brands,
    viewed: rootState.catalog.viewed
});

const mapDispatchToProps = {
    getArrivals: getArrivalsRoutine,
    getDiscounted: getDiscountedRoutine,
    getBestSales: getBestSalesRoutine,
    getViewed: getViewedRoutine,
    getBrands: getBrandsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
