import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Link as LinkComponent } from '../../../../components';

const meta = {
    title: 'Components/Links/Link',
    component: LinkComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        to: {
            description: 'href value'
        },
        children: {
            description: 'React.ReactNode'
        },
        className: {
            description: 'class names'
        }
    }
} satisfies Meta<typeof LinkComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Link: Story = {
    args: {
        to: '/',
        children: 'link text'
    }
};
