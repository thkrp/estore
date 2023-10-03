import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { mockData } from 'app-shared';
import { HorizontalSlider as HorizontalSliderComponent } from '../../../../components';
import { CardType } from '../../../../common/enums/card.type';

const meta = {
    title: 'Components/Sliders/Horizontal',
    component: HorizontalSliderComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        slides: {
            description: 'slides'
        },
        title: {
            description: 'section title'
        },
        type: {
            description: 'type of slides'
        },
        count: {
            description: 'visible slides'
        },
        className: {
            description: 'class name'
        },
        speed: {
            description: 'slides speed'
        },
        slidesToScroll: {
            description: 'number of changing slides'
        }
    }
} satisfies Meta<typeof HorizontalSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const HorizontalSlider: Story = {
    args: {
        slides: mockData.arrivals,
        title: 'Arrivals',
        count: 3,
        type: CardType.product,
        speed: 500,
        slidesToScroll: 1
    }
};
