import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export const WrapperStyled = styled.div`
    padding: 40px 0;
    .horizontal-slider {
        .slick-track {
            margin-left: 0;
        }
    }

    .brand-slider {
        .slick-list {
            margin: 0 -20px;
        }
    }
`;

export const SlideHeaderStyled = styled.div`
    display: flex;
`;

export const HeadingStyled = styled.h3`
    margin: 0;
    padding: 10px 0;
    font-family: ${theme.fonts.semiBold};
    font-size: 32px;
    color: ${theme.colors.text.grey};
`;

export const LineStyled = styled.div`
    flex: 1 1 50%;
    margin: 0 10px;
    align-self: center;
    height: 1px;
    border-bottom: 1px solid ${theme.colors.grey};
`;

export const ArrowsStyled = styled.div`
    display: flex;
    align-items: center;
`;

const Arrow = css`
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0 10px;

    svg {
        fill: ${theme.colors.grey};

        &:hover {
            fill: ${theme.colors.darkgrey};
        }
    }
`;

export const ArrowLeftStyled = styled.div`
    ${Arrow};
    transform: rotate(90deg);
`;

export const ArrowRightStyled = styled.div`
    ${Arrow};
    transform: rotate(-90deg);
`;
