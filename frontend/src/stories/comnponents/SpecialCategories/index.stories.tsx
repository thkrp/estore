import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { SpecialCategories as SpecialCategoriesComponent } from '../../../components';

const meta = {
    title: 'Components/SpecialCategories',
    component: SpecialCategoriesComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof SpecialCategoriesComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const SpecialCategories: Story = {};
