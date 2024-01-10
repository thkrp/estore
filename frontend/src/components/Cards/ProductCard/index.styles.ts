import styled from 'styled-components';
import Link from '../../Links/Link';
import { theme } from '../../../styles/theme';
import { media } from '../../../styles/media';

export const CardStyled = styled(Link)`
    flex: 0 0 25%;
    padding: 12px;
    border: 1px solid ${theme.colors.borders.lightgrey};
    text-decoration: none;
    display: flex;
    flex-flow: column;
    height: 100%;
    background: ${theme.colors.main.white};
    position: relative;

    &:hover {
        z-index: 2;
        border-color: ${theme.colors.borders.darkgrey};
        box-shadow: none;
    }

    &.slider {
        margin: 15px 0;
    }

    ${media.untilTabletLg`
        flex: 0 0 33.333333333%;
    `}
    ${media.untilTabletLg`
        flex: 0 0 50%;
    `}
    ${media.untilPhoneMd`
        flex: 1 1 100%;
    `}
`;

export const ImageStyled = styled.span<{ $image: string }>`
    display: block;
    background: url('${({ $image }) => $image}') no-repeat center 10% / contain;
    width: 100%;
    flex: 1 1 30%;
    min-height: 200px;
`;

export const HeadingStyled = styled.h3`
    height: 80px;
    font-family: ${theme.fonts.bold};
    font-size: 22px;
    color: ${theme.colors.main.secondary};
    overflow: hidden;
`;
