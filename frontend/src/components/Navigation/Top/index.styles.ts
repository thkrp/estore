import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import Link from '../../Links/Link';

export const WrapperStyled = styled.div`
    display: flex;
    width: 100%;
`;

export const ListStyled = styled.nav`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: center;
`;

export const ElementStyled = styled.div`
    border-right: 2px solid ${theme.colors.borders.darkgrey};
    margin: 5px 0;

    &:last-child {
        border-right: none;
    }
`;

export const LinkStyled = styled(Link)`
    display: flex;
    padding: 0 10px;
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    font-family: ${theme.fonts.bold};
    font-size: 14px;
    color: ${theme.colors.text.grey};

    &:active,
    &:visited,
    &:focus {
        color: ${theme.colors.text.grey};
    }

    &:hover {
        color: ${theme.colors.text.black};
    }
`;
