import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
// eslint-disable-next-line no-restricted-imports
import LanguageComponent from '../../../components/Language';

const meta = {
    title: 'Components/Language',
    component: LanguageComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof LanguageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Language: Story = {};
