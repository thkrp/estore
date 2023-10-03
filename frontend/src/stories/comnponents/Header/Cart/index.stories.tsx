import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
// eslint-disable-next-line no-restricted-imports
import { IntlProvider } from 'react-intl';
import { Locale, Localization, mockData } from 'app-shared';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import CartComponent from '../../../../components/Header/Cart';

const meta = {
    title: 'Components/Header/Cart',
    component: CartComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof CartComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Cart: Story = {
    decorators: [
        Story => (
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <Story />
            </IntlProvider>
        )
    ]
};
