import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
// eslint-disable-next-line no-restricted-imports
import LogoComponent from '../../../components/Logo';

const meta = {
    title: 'Components/Logo',
    component: LogoComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        logo: {
            description: 'logo path'
        }
    }
} satisfies Meta<typeof LogoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Logo: Story = {
    args: {
        logo: ''
    }
};
