import styled from 'styled-components';

export const WrapperStyled = styled.div`
    .slick-dots {
        bottom: 0 !important;
    }
`;

export const SlideItemStyled = styled.div<{ $image: string }>`
    position: relative;
    display: block;
    // background: ${({ $image }) => ($image ? `url(${$image})` : '')} no-repeat center center / cover;
    img {
        width: 100%;
        height: 100%;
        max-height: 320px;
    }
`;

export const SlideTitleStyled = styled.h3`
    margin: 0;
`;
