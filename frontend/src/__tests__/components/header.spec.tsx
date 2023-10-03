/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Locale, Localization, mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Header } from '../../components';

describe('header', () => {
    const menu = mockData.topMenu;
    const info = mockData.generalInformation;
    it('should not be empty', () => {
        const { container } = render(
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <Header menu={menu} info={info} />
            </IntlProvider>,
            { wrapper: MemoryRouter }
        );
        expect(container).not.toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
});
