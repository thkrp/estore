import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    CartLabelStyled,
    CartLinkStyled,
    PriceStyled,
    PriceWrapperStyled,
    QtyStyled,
    WrapperStyled
} from './index.styles';
import useCart from '../../../common/hooks/use.cart';
import { Routes } from '../../../common/enums/routing/routes';

const Cart = () => {
    const { count, sum } = useCart();

    return (
        <WrapperStyled>
            <CartLinkStyled to={Routes.cart}>
                <QtyStyled>{count}</QtyStyled>
            </CartLinkStyled>
            <PriceWrapperStyled>
                <CartLabelStyled to={Routes.cart}>
                    <FormattedMessage id="cart" />:
                </CartLabelStyled>
                <PriceStyled>
                    {sum}{' '}
                    <span>
                        <FormattedMessage id="currency" values={{ uah: <>&#8372;</> }} />
                    </span>
                </PriceStyled>
            </PriceWrapperStyled>
        </WrapperStyled>
    );
};

export default Cart;
