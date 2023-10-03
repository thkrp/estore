import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import { ProductCard } from '../../../../components';

export const WrapperStyled = styled.div`
    background: ${theme.colors.main.background};
    min-height: 500px;
    padding: 40px 0 65px;
`;

export const HeadingStyled = styled.h3`
    margin: 0;
    padding: 10px 0;
    font-family: ${theme.fonts.semiBold};
    font-size: 32px;
    color: ${theme.colors.text.grey};
`;

export const ContentStyled = styled.div`
    display: flex;
`;

export const ListStyled = styled.div`
    flex: 1 1 60%;
    display: flex;
    flex-wrap: wrap;
`;

export const ProductCardStyled = styled(ProductCard)`
    flex: 0 0 33.333%;
    height: auto;
    max-width: 33.333%;
`;

export const MainItemStyled = styled.div`
    flex: 1 1 30%;
`;
