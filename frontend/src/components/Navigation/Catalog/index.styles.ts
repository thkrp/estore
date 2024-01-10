import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import Link from '../../Links/Link';
import { media } from '../../../styles/media';

export const WrapperStyled = styled.div`
    height: 100%;
    display: flex;
    align-content: flex-start;
    flex-flow: column wrap;
`;

export const HeadingStyled = styled.div`
    display: flex;
    align-items: center;
    height: 52px;
    background: ${theme.colors.main.primary};
    cursor: pointer;
    border-radius: 4px 0 0;
    width: 100%;
    ${media.untilTabletLg`
        margin-bottom: 10px;
    `}
`;

export const IconStyled = styled.span`
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 20px;
`;

export const LinkStyled = styled(Link)`
    text-transform: uppercase;
    font-family: ${theme.fonts.semiBold};
    color: ${theme.colors.main.white};
    text-decoration: none;
`;

export const ListStyled = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    border: 1px solid ${theme.colors.borders.darkgrey};
    border-top: none;
    border-radius: 0 0 0 4px;
    width: 100%;
    ${media.untilTabletLg`
        display: none;
    `}
`;

export const ElementStyled = styled(Link)`
    flex: 1 1 100%;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: ${theme.fonts.semiBold};
    text-decoration: none;
    color: ${theme.colors.darkgrey};
    position: relative;

    &:hover {
        background: ${theme.colors.main.background};
    }

    &::after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background: url('/assets/icons/down-arrow.svg') no-repeat center center / contain;
        transform: rotate(-90deg);
        position: absolute;
        right: 2px;
        top: 35%;
    }

    &:last-child {
        border-radius: 0 0 0 4px;
    }
`;
