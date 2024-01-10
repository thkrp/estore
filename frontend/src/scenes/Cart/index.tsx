import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { RootState } from '../../store/types/root.state';
import { getCartItemsRoutine, removeCartItemRoutine } from './routines';
import { CartItem } from './types/cart.state';

type Props = {
    isLoading: boolean;
    items: CartItem[];
    getCartItems: () => void;
    removeCartItem: (id: string) => void;
};
const Cart = ({ items, getCartItems, isLoading, removeCartItem }: Props) => {
    const isCanceled = useRef(false);
    useEffect(() => {
        if (!isCanceled.current) {
            isCanceled.current = true;
            getCartItems();
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <h2 style={{ color: 'skyblue' }}>Cart</h2>
            {items.length ? (
                items.map(item => (
                    <div key={item.product.code}>
                        <div>
                            {item.product.name}, {item.count}
                            <span
                                role="presentation"
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                                onClick={() => removeCartItem(item.product.code)}
                            >
                                remove
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div>cart is empty</div>
            )}
        </div>
    );
};

const mapStateToProps = (rootState: RootState) => ({
    isLoading: rootState.cart.isLoading,
    items: rootState.cart.items
});

const mapDispatchToProps = {
    getCartItems: getCartItemsRoutine,
    removeCartItem: removeCartItemRoutine
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
