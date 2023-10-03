import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Locale, Localization, mockData } from 'app-shared';
import { IntlProvider } from 'react-intl';
// eslint-disable-next-line no-restricted-imports
import ActionsComponent from '../../../../components/Header/Actions';

const meta = {
    title: 'Components/Header/Actions',
    component: ActionsComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        phones: {
            description: 'phones'
        },
        emails: {
            description: 'emails'
        }
    }
} satisfies Meta<typeof ActionsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Actions: Story = {
    args: {
        phones: mockData.generalInformation.phones,
        emails: mockData.generalInformation.emails
    },
    decorators: [
        Story => (
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <Story />
            </IntlProvider>
        )
    ]
};
