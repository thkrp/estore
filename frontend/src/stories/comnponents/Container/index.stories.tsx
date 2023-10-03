import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Container as ContainerComponent } from '../../../components';

const meta = {
    title: 'Components/Container',
    component: ContainerComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'React.ReactNode'
        },
        className: {
            description: 'class names'
        }
    }
} satisfies Meta<typeof ContainerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Container: Story = {
    args: {
        children: <h3>Any content</h3>
    }
};
