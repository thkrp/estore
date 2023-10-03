import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Locale, Localization, mockData } from 'app-shared';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { TopNav as TopNavComponent } from '../../../../components';

const meta = {
    title: 'Components/Navigation/Top',
    component: TopNavComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        menu: {
            description: 'top menu'
        }
    }
} satisfies Meta<typeof TopNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const TopNav: Story = {
    args: {
        menu: mockData.topMenu
    },
    decorators: [
        Story => (
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <Story />
            </IntlProvider>
        )
    ]
};
