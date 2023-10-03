import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const IconsStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const IconStyled = styled.div<{ width?: string; height?: string }>`
    border: 1px solid grey;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 100px;
    min-width: 100px;
    margin: 10px;
    svg {
        width: ${({ width }) => width || '20px'};
        height: ${({ height }) => height || '20px'};
        fill: ${theme.colors.text.black};
        * {
            fill: ${theme.colors.text.black};
        }
    }
    div {
        flex: 1 1 100%;
        text-align: center;
    }
`;
