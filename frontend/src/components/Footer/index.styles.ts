import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const WrapperStyled = styled.footer`
    margin: auto 0 0;
    padding: 0;
`;

export const FooterStyled = styled.div`
    display: flex;
    padding: 20px 0 60px;
`;

export const LogoWrapperStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 30%;
    align-content: flex-start;
`;

export const LogoDescriptionStyled = styled.div`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.grey};
    margin: 7px 0;
`;

export const MenuWrapperStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ListWrapperStyled = styled.div`
    flex: 1 1 20%;
    justify-content: center;
    margin: 0 15px;

    &:last-child {
        margin-right: 0;
    }
`;

export const ListHeadingStyled = styled.h3`
    font-family: ${theme.fonts.semiBold};
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;
    color: ${theme.colors.darkgrey};
    margin-top: 0;
    margin-bottom: 10px;
`;

export const ListStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ListItemStyled = styled.div`
    flex: 1 1 100%;
    a {
        text-decoration: none;
        color: ${theme.colors.grey};
        display: flex;
        margin: 3px 0;
        line-height: 20px;
        font-size: 15px;
        &:hover {
            color: ${theme.colors.darkgrey};
        }
    }
`;
