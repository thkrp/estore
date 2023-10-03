import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import React from 'react';
import { HomeSlider as HomeSliderComponent } from '../../../../components';
import Slide1 from '../../../../assets/images/slides/slide-1.jpg';
import Slide2 from '../../../../assets/images/slides/slide-2.jpg';
import Slide3 from '../../../../assets/images/slides/slide-3.jpg';

const meta = {
    title: 'Components/Sliders/Home',
    component: HomeSliderComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        slides: {
            description: 'slides'
        }
    }
} satisfies Meta<typeof HomeSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const HomeSlider: Story = {
    args: {
        slides: [
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
        ]
    },
    decorators: [
        Story => (
            <div style={{ maxWidth: '700px' }}>
                <Story />
            </div>
        )
    ]
};
