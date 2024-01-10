import React from 'react';
import { Settings } from 'react-slick';
import { Brand } from 'app-shared';
import { HorizontalSliderProps } from '../../../../common/types/horizontal.slider.props';
import { CardType } from '../../../../common/enums/card.type';
import { HorizontalSlider } from '../../../../components';
import { devices } from '../../../../styles/media';

type Props<T> = HorizontalSliderProps<T>;
const Brands = ({ slides = [], title = '' }: Props<Brand>) => {
    const settings: Settings = {
        slidesToShow: 6,
        responsive: [
            {
                breakpoint: devices.desktopMd,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: devices.desktop,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: devices.tablet,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: devices.phoneLg,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    };

    return <HorizontalSlider slides={slides} title={title} type={CardType.brand} settings={settings} />;
};

export default Brands;
