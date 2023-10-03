import styled from 'styled-components';

export const WrapperStyled = styled.div`
    .slick-dots {
        bottom: 0 !important;
    }
`;

export const SlideItemStyled = styled.div<{ $image: string }>`
    height: 320px;
    background: ${({ $image }) => ($image ? `url(${$image})` : '')} no-repeat center center / cover;
`;

export const SlideTitleStyled = styled.h3`
    margin: 0;
`;
