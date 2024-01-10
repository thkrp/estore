import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import Link from '../../Links/Link';
import { media } from '../../../styles/media';

export const WrapperStyled = styled.div`
    display: flex;
    width: 100%;
`;

export const ListStyled = styled.nav`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    ${media.tablet`
        position: relative;
        background: #FFF;
        z-index: 10;
    `}
`;

export const ElementsStyled = styled.div<{ $showNav: boolean }>`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: center;
    ${({ $showNav }) => media.tablet`
        display: ${$showNav ? 'flex' : 'none'};
        position: absolute;
        top: 36px;
        flex-wrap: wrap;
        width: 280px;
    `};
`;

export const ElementStyled = styled.div`
    border-right: 2px solid ${theme.colors.borders.darkgrey};
    margin: 5px 0;

    &:last-child {
        border-right: none;
    }
    ${media.tablet`
        margin: 0;
        padding: 10px 0;
        background: ${theme.colors.main.white};
        flex: 1 1 100%;
        border-left: 1px solid ${theme.colors.borders.lightgrey};
        border-right: 1px solid ${theme.colors.borders.lightgrey};
        &:last-child {
            border-bottom: 1px solid ${theme.colors.borders.lightgrey};
            border-right: 1px solid ${theme.colors.borders.lightgrey};
        }
        &:first-child {
            border-top: 1px solid ${theme.colors.borders.lightgrey};
        }
    `};
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

export const AboutButtonStyled = styled.div`
    display: none;
    cursor: pointer;
    padding: 10px 0;
    font-size: 14px;
    color: ${theme.colors.text.grey};
    ${media.tablet`
        display: block;
    `}
`;
