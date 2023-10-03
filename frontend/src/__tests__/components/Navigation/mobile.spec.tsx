/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { Locale, Localization, mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import * as sanitizer from '@braintree/sanitize-url';
import { IntlProvider } from 'react-intl';
import { MobileNav } from '../../../components';
import { Menu } from '../../../store/app/types/app.state';

describe('MobileNav', () => {
    afterEach(cleanup);
    const menu: Partial<Menu> = { top: mockData.top };

    it('should be defined', () => {
        const { container } = render(
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <MobileNav menu={menu} info={mockData.generalInformation} />
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
                <MobileNav menu={menu} />
            </IntlProvider>,
            { wrapper: MemoryRouter }
        );
        expect(sanitizer.sanitizeUrl).toHaveBeenCalled();
    });

    it('more button should open and close additional menu', () => {
        render(
            <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                <MobileNav menu={menu} />
            </IntlProvider>,
            { wrapper: MemoryRouter }
        );
        const moreButton = screen.getByRole('button');
        expect(screen.queryAllByRole('navigation').length).toBe(1);
        fireEvent.click(moreButton);
        expect(screen.queryAllByRole('navigation').length).toBe(2);
        fireEvent.click(moreButton);
        expect(screen.queryAllByRole('navigation').length).toBe(1);
    });
});
