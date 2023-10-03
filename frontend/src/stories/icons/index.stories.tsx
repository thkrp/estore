import { Meta, StoryObj } from '@storybook/react';
import { AllIcons } from './all.icons';

const meta = {
    title: 'Icons',
    component: AllIcons,
    parameters: {
        layout: 'centered',
        source: {
            code: null
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof AllIcons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Icons: Story = {
    parameters: {
        docs: {
            canvas: {
                sourceState: 'none'
            }
        }
    }
};
