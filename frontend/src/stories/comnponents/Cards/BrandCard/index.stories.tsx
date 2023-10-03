import { Meta, StoryObj } from '@storybook/react';
import { mockData } from 'app-shared';
import { withRouter } from 'storybook-addon-react-router-v6';
import React from 'react';
import { BrandCard as BrandCardComponent } from '../../../../components';
import '../../../styles.css';

const meta = {
    title: 'Components/Cards/BrandCard',
    component: BrandCardComponent,
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
} satisfies Meta<typeof BrandCardComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BrandCard: Story = {
    args: {
        item: mockData.brands[0]
    },
    decorators: [
        Story => (
            <div className="storybook-cards">
                <Story />
            </div>
        )
    ]
};
