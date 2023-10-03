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

const Cart = () => {
    return (
        <WrapperStyled>
            <CartLinkStyled to="/">
                <QtyStyled>2</QtyStyled>
            </CartLinkStyled>
            <PriceWrapperStyled>
                <CartLabelStyled to="/">
                    <FormattedMessage id="cart" />:
                </CartLabelStyled>
                <PriceStyled>
                    14289{' '}
                    <span>
                        <FormattedMessage id="currency" values={{ uah: <>&#8372;</> }} />
                    </span>
                </PriceStyled>
            </PriceWrapperStyled>
        </WrapperStyled>
    );
};

export default Cart;
