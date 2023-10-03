import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const ContactLinkStyled = styled.a`
    margin: 5px 10px;
    display: flex;
    align-items: center;
    font-family: ${theme.fonts.semiBold};
    text-decoration: none;
    color: ${theme.colors.grey};
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    fill: ${theme.colors.grey};
    &:hover {
        color: ${theme.colors.darkgrey};
        fill: ${theme.colors.darkgrey};
    }
`;

export const ContactIconStyled = styled.div`
    display: block;
    width: 15px;
    height: 15px;
    margin-right: 5px;

    & svg {
        width: 100%;
        height: 100%;
    }
`;
