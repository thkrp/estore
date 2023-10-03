import { Meta, StoryObj } from '@storybook/react';
import { mockData } from 'app-shared';
import { withRouter } from 'storybook-addon-react-router-v6';
import React from 'react';
import { ProductCard as ProductCardComponent } from '../../../../components';
import '../../../styles.css';

const meta = {
    title: 'Components/Cards/ProductCard',
    component: ProductCardComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'wide'
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            description: 'class names'
        }
    }
} satisfies Meta<typeof ProductCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const ProductCard: Story = {
    args: {
        item: mockData.products.items[0]
    },
    decorators: [
        Story => (
            <div className="storybook-cards">
                <Story />
            </div>
        )
    ]
};
