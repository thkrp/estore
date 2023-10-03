import styled from 'styled-components';
import Link from '../../Links/Link';
import { theme } from '../../../styles/theme';

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
    margin: 0 20px;
    min-height: 100px;

    &:hover {
        z-index: 2;
        background: ${theme.colors.main.background};
    }
`;

export const ImageStyled = styled.span<{ $image: string }>`
    display: block;
    background: url('${({ $image }) => $image}') no-repeat center / contain;
    width: 100%;
    flex: 1 1 30%;
    height: 100%;
`;
