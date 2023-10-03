import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
// eslint-disable-next-line no-restricted-imports
import ContactLinkComponent from '../../../../components/Links/ContactLink';

const meta = {
    title: 'Components/Links/ContactLink',
    component: ContactLinkComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'phone number or email address'
        },
        className: {
            description: 'class names'
        },
        hiddenIcon: {
            description: 'show or hide icon'
        },
        type: {
            description: 'type of link'
        }
    }
} satisfies Meta<typeof ContactLinkComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Email: Story = {
    args: {
        value: 'test@test.com',
        type: 'email'
    }
};

export const Phone: Story = {
    args: {
        value: '+380 50 000 00 00',
        type: 'phone'
    }
};

export const WithoutIcon: Story = {
    args: {
        value: '+380 50 000 00 00',
        type: 'phone',
        hiddenIcon: true
    }
};
