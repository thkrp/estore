import styled from 'styled-components';
import { RightSideStyled as RightSide } from '../index.styles';

export const RightSideStyled = styled(RightSide)`
    max-width: calc(1200px - 280px);
    margin-left: auto;
`;

export const ContentStyled = styled.div`
    display: flex;
    flex: 1 1 100%;
`;
