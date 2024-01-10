import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { Brand, Product } from 'app-shared';
import ProductCard from '../../Cards/ProductCard';
import BrandCard from '../../Cards/BrandCard';
import Container from '../../Container';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/down-arrow.svg';
import {
    ArrowLeftStyled,
    ArrowRightStyled,
    ArrowsStyled,
    HeadingStyled,
    LineStyled,
    SlideHeaderStyled,
    WrapperStyled
} from './index.styles';
import { CardType } from '../../../common/enums/card.type';
import { HorizontalSliderProps } from '../../../common/types/horizontal.slider.props';

type Props<T> = HorizontalSliderProps<T> & {
    settings?: Settings;
};

const CardComponents = {
    brand: (slide: Brand) => <BrandCard item={slide} className="slider" />,
    product: (slide: Product) => <ProductCard item={slide} className="slider" />
};

const HorizontalSlider = <T extends { code: string }>({
    slides = [],
    title,
    type = CardType.product,
    settings: {
        slidesToShow = 6,
        className = '',
        speed = 500,
        slidesToScroll = 1,
        responsive = [],
        infinite = false
    } = {}
}: Props<T>) => {
    const slider = useRef<Slider>(null);
    const isInfinite = infinite || slides.length > slidesToShow;
    const settings: Settings = {
        infinite,
        speed,
        slidesToShow,
        slidesToScroll,
        arrows: false,
        dots: false,
        draggable: false,
        swipe: true,
        className: `horizontal-slider ${className}`,
        responsive
    };

    const onNext = () => {
        slider.current?.slickNext();
    };

    const onPrev = () => {
        slider.current?.slickPrev();
    };

    return (
        <WrapperStyled className={className}>
            <Container>
                <SlideHeaderStyled>
                    <HeadingStyled>{title}</HeadingStyled>
                    <LineStyled />
                    {isInfinite && (
                        <ArrowsStyled>
                            <ArrowLeftStyled role="presentation" onClick={() => onPrev()}>
                                <ArrowIcon />
                            </ArrowLeftStyled>
                            <ArrowRightStyled role="presentation" onClick={() => onNext()} className="right">
                                <ArrowIcon />
                            </ArrowRightStyled>
                        </ArrowsStyled>
                    )}
                </SlideHeaderStyled>
                {!!slides.length && (
                    <Slider {...settings} ref={slider}>
                        {slides.map(slide => {
                            const renderCard = CardComponents[type];
                            return <div key={slide.code}>{renderCard(slide as never)}</div>;
                        })}
                    </Slider>
                )}
            </Container>
        </WrapperStyled>
    );
};

export default HorizontalSlider;
