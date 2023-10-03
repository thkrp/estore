import styled from 'styled-components';
import Link from '../../Links/Link';
import { theme } from '../../../styles/theme';

export const WrapperStyled = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background: ${theme.colors.main.background};
`;
export const MobileStyled = styled.nav`
    height: 50px;
    display: flex;
    max-width: 400px;
    margin: 0 auto;
`;

export const LinkStyled = styled(Link)`
    flex: 0 0 25%;
    background: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MoreStyled = styled.button`
    flex: 0 0 25%;
    cursor: pointer;
`;

export const MoreLinkStyled = styled.nav`
    background: ${theme.colors.main.white};
    position: absolute;
    bottom: 100%;
    width: 100%;
    height: calc(100vh - 50px);
`;

export const MoreTopStyled = styled.div`
    height: 50px;
    padding: 5px;
    width: 100%;
    flex-wrap: wrap;
    img {
        width: auto;
        height: 100%;
    }
`;

export const LogoWrapperStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
`;
