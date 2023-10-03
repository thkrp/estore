import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide1 from '../../../assets/images/slides/slide-1.jpg';
import Slide2 from '../../../assets/images/slides/slide-2.jpg';
import Slide3 from '../../../assets/images/slides/slide-3.jpg';
import { SlideItemStyled, SlideTitleStyled, WrapperStyled } from './index.styles';

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots'
};

const data = [
    {
        title: 'slide1',
        image: Slide1,
        code: 'slide1'
    },
    {
        title: 'slide2',
        image: Slide2,
        code: 'slide2'
    },
    {
        title: 'slide3',
        image: Slide3,
        code: 'slide3'
    }
];

type Slide = {
    code: string;
    image: string;
    title: string;
};

type Props = {
    slides?: Slide[];
};

const HomeSlider: React.FC<Props> = ({ slides = data }) => {
    if (!slides) {
        return null;
    }

    return (
        <WrapperStyled>
            <Slider {...settings}>
                {slides.map(slide => (
                    <div key={slide.code}>
                        <SlideItemStyled $image={slide.image}>
                            <div>
                                <SlideTitleStyled>{slide.title}</SlideTitleStyled>
                            </div>
                        </SlideItemStyled>
                    </div>
                ))}
            </Slider>
        </WrapperStyled>
    );
};

export default HomeSlider;
