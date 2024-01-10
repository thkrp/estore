/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { Locale, Localization, mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import * as sanitizer from '@braintree/sanitize-url';
import { IntlProvider } from 'react-intl';
import { TopNav } from '../../../components';

describe('TopNav', () => {
    afterEach(cleanup);

    it('should be defined', () => {
        const { container } = render(
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <TopNav menu={mockData.topMenu} />
            </IntlProvider>,
            { wrapper: MemoryRouter }
        );
        expect(container).toBeDefined();
        expect(container).toMatchSnapshot();
    });

    it('sanitizeUrl has been called', () => {
        jest.spyOn(sanitizer, 'sanitizeUrl');
        render(
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <TopNav menu={mockData.topMenu} />
            </IntlProvider>,
            { wrapper: MemoryRouter }
        );
        expect(sanitizer.sanitizeUrl).toHaveBeenCalled();
    });

    it('should return null if no menu', () => {
        const { container } = render(
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <TopNav />
            </IntlProvider>,
            { wrapper: MemoryRouter }
        );
        expect(container).toBeEmptyDOMElement();
    });
});
