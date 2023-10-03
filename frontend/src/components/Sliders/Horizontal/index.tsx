import React, { useRef } from 'react';
import Slider from 'react-slick';
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

type Props<T> = {
    slides?: T[];
    title: string;
    type?: CardType;
    count?: number;
    className?: string;
    speed?: number;
    slidesToScroll?: number;
};

const CardComponents = {
    brand: (slide: Brand) => <BrandCard item={slide} className="slider" />,
    product: (slide: Product) => <ProductCard item={slide} className="slider" />
};

const HorizontalSlider = <T extends { code: string }>({
    slides = [],
    title,
    type = CardType.product,
    count = 6,
    className = '',
    speed = 500,
    slidesToScroll = 1
}: Props<T>) => {
    const slider = useRef<Slider>(null);
    const infinite = slides.length > count;

    const settings = {
        infinite,
        speed,
        slidesToShow: count,
        slidesToScroll,
        arrows: false,
        dots: false,
        draggable: false,
        swipe: true,
        className: `horizontal-slider ${className}`
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
                    {infinite && (
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
