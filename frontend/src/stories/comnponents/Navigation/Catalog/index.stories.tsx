import { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Locale, Localization, mockData } from 'app-shared';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { CatalogNav as CatalogNavComponent } from '../../../../components';

const meta = {
    title: 'Components/Navigation/Catalog',
    component: CatalogNavComponent,
    decorators: [withRouter],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        menu: {
            description: 'catalog menu'
        }
    }
} satisfies Meta<typeof CatalogNavComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const CatalogNav: Story = {
    args: {
        menu: mockData.catalogMenu
    },
    decorators: [
        Story => (
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <Story />
            </IntlProvider>
        )
    ]
};
