import styled from 'styled-components';
import { RightSideStyled as RightSide } from '../index.styles';
import { media } from '../../styles/media';

export const ContentStyled = styled.div`
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
`;

export const RightSideStyled = styled(RightSide)`
    max-width: calc(1200px - 280px);
    margin-left: auto;
    overflow: hidden;
    ${media.untilTabletLg`
        flex: 1 1 100%;
        max-width: 100%;
    `}
`;
