import { Meta, StoryObj } from '@storybook/react';
import { InputText as InputTextComponent } from '../../../components';

const meta = {
    title: 'Components/InputText',
    component: InputTextComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'value'
        },
        onChange: {
            description: 'onChange func'
        },
        name: {
            description: 'name'
        },
        placeholder: {
            description: 'placeholder'
        },
        className: {
            description: 'class name'
        }
    }
} satisfies Meta<typeof InputTextComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const InputText: Story = {
    args: {
        value: '',
        placeholder: 'search'
    }
};
