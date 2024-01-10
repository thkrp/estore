import styled from 'styled-components';
import { media } from '../styles/media';

export const WrapperStyled = styled.div`
    display: flex;
    min-height: 100%;
    flex-flow: column wrap;
    box-sizing: border-box;
`;

export const ContentWrapperStyled = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const LeftSideStyled = styled.div`
    flex: 0 0 250px;
    max-width: 250px;
    ${media.untilTabletLg`
        flex: 1 1 100%;
        max-width: 100%;
    `};
`;

export const RightSideStyled = styled.div`
    flex: 1 1 50%;
    height: 100%;
`;

export const MobileWrapperStyled = styled.div``;

export const SearchWrapperStyled = styled.div`
    margin: 10px 5px;
`;
