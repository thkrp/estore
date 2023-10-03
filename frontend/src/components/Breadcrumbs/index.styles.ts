import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Link from '../Links/Link';

export const WrapperStyled = styled.div`
    height: 52px;
    background: ${theme.colors.main.background};
`;

export const ListStyled = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0;
`;

export const ElementStyled = styled.div`
    display: flex;
    text-overflow: ellipsis;
    text-decoration: none;
    color: ${theme.colors.darkgrey};
    padding: 0 20px;
    height: 100%;
    position: relative;
    align-items: center;
    font-size: 14px;

    &::after {
        content: '';
        display: inline-block;
        height: 100%;
        width: 1px;
        background: ${theme.colors.borders.grey};
        position: absolute;
        right: 0;
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        right: -5px;
        width: 10px;
        height: 10px;
        border-right: 1px solid ${theme.colors.borders.grey};
        border-top: 1px solid ${theme.colors.borders.grey};
        z-index: 1;
        transform: rotate(45deg);
        background: ${theme.colors.main.background};
    }

    &:last-child {
        color: ${theme.colors.main.primary};

        &::before,
        &::after {
            display: none;
        }
    }
`;

export const MoreCategoriesButtonStyled = styled.div`
    border: 8px solid transparent;
    border-right: 8px solid ${theme.colors.borders.grey};
    border-bottom: 8px solid ${theme.colors.borders.grey};
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;

    &:hover {
        border-right-color: ${theme.colors.darkgrey};
        border-bottom-color: ${theme.colors.darkgrey};
    }
`;

export const CategoriesStyled = styled.div`
    position: absolute;
    background: ${theme.colors.borders.lightgrey};
    top: 100%;
    left: 100%;
    z-index: 1;
    padding: 5px;

    a {
        display: block;
        width: 100%;
        white-space: nowrap;
        color: ${theme.colors.darkgrey};
    }
`;

export const LinkStyled = styled(Link)`
    color: inherit;
    text-decoration: none;
`;
