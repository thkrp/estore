import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailedProduct, Product } from 'app-shared';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { RootState } from '../../../store/types/root.state';
import { addViewedRoutine, getDetailedProductRoutine } from '../routines';
import { addItemToCartRoutine } from '../../Cart/routines';
import { CartItem } from '../../Cart/types/cart.state';
import { CleanHtml } from '../../../components';
import ProductMapper from '../../../common/mappers/product.mapper';

type Props = {
    product?: DetailedProduct;
    getDetailedProduct: (id: string) => void;
    addItemToCart: (item: CartItem) => void;
    addViewed: (item: Product) => void;
};

const Detail = ({ product, getDetailedProduct, addItemToCart, addViewed }: Props) => {
    const { id } = useParams();
    const isCanceled = useRef(false);
    const updatingProduct = id !== product?.code;

    useEffect(() => {
        if (!isCanceled.current && id && updatingProduct) {
            isCanceled.current = true;
            getDetailedProduct(id);
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            addViewed(ProductMapper.mapDetailedProductToProduct(product));
        }
    }, [product]);

    if (!product || updatingProduct) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <div>
                <div>{product.name}</div>
                <button
                    type="button"
                    onClick={() => addItemToCart({ product, count: 1 })}
                    aria-label="adding a product"
                >
                    <FormattedMessage id="addToCart" />
                </button>
            </div>
            <h3>{product.name}</h3>
            {!!product.detail_text && <CleanHtml dirty={product.detail_text} />}
        </>
    );
};
const mapStateToProps = (rootState: RootState) => ({
    product: rootState.catalog.detailed
});

const mapDispatchToProps = {
    getDetailedProduct: getDetailedProductRoutine,
    addItemToCart: addItemToCartRoutine,
    addViewed: addViewedRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
