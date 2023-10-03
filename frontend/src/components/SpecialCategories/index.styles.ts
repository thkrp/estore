import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Link from '../Links/Link';

export const WrapperStyled = styled.div`
    width: 100%;
    margin: 20px 0;
`;

export const ListStyled = styled.div`
    display: flex;
    margin: 0 -10px;
`;

export const ElementStyled = styled(Link)<{
    backgroundImage?: string;
    justifyContent?: string;
    textAlign?: string;
}>`
    flex: 1 1 25%;
    margin: 10px;
    height: 100px;
    background: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : '')} no-repeat center center /
        cover;
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
    align-items: center;
    align-content: center;
    padding: 20px;
    text-decoration: none;
    color: inherit;
    text-align: ${({ textAlign }) => textAlign || 'inherit'};
`;

export const TitleStyled = styled.span<{ color: string }>`
    flex: 0 0 60%;
    font-family: ${theme.fonts.bold};
    font-size: 18px;
    color: ${({ color }) => color || 'inherit'};
`;

export const DescriptionStyled = styled.div`
    flex: 0 0 60%;
    color: ${theme.colors.grey};
`;
