import styled from 'styled-components';
import CartIcon from '../../../assets/icons/cart.svg';
import Link from '../../Links/Link';
import { theme } from '../../../styles/theme';

export const WrapperStyled = styled.div`
    flex: 1 1 50px;
    max-width: 200px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const CartLinkStyled = styled(Link)`
    display: block;
    flex: 0 0 50px;
    width: 50px;
    height: 50px;
    background: url(${CartIcon}) no-repeat center center;
    position: relative;
`;

export const PriceWrapperStyled = styled.div`
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
`;

export const CartLabelStyled = styled(Link)`
    display: table;
    color: ${theme.colors.grey};
    text-decoration: none;
    font-family: ${theme.fonts.semiBold};

    &:hover {
        color: ${theme.colors.darkgrey};
    }
`;

export const PriceStyled = styled.span`
    display: table;
    white-space: nowrap;
    font-size: 20px;
    color: ${theme.colors.main.primary};

    span {
        font-weight: bold;
    }
`;

export const QtyStyled = styled.span`
    background: ${theme.colors.main.white};
    color: ${theme.colors.main.primary};
    display: block;
    width: 25px;
    height: 25px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    left: 15px;
    top: 0;
    font-family: ${theme.fonts.light};
    font-size: 17px;
    font-weight: bold;
`;
