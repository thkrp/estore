import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailedProduct } from 'app-shared';
import { Helmet } from 'react-helmet-async';
import { RootState } from '../../../store/types/root.state';
import { getDetailedProductRoutine } from '../routines';

type Props = {
    product?: DetailedProduct;
    getDetailedProduct: (id: string) => void;
};

const Detail = ({ product, getDetailedProduct }: Props) => {
    const { id } = useParams();
    const isCanceled = useRef(false);
    const updatingProduct = id !== product?.code;

    useEffect(() => {
        if (!isCanceled.current && id && updatingProduct) {
            isCanceled.current = true;
            getDetailedProduct(id);
        }
    }, [id]);

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
            </div>
        </>
    );
};
const mapStateToProps = (rootState: RootState) => ({
    product: rootState.catalog.detailed
});

const mapDispatchToProps = {
    getDetailedProduct: getDetailedProductRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
