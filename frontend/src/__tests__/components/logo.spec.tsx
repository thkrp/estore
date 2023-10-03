/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import * as sanitizer from '@braintree/sanitize-url';
import Logo from '../../components/Logo';

describe('logo', () => {
    afterEach(cleanup);

    it('should be able to pass a logo', () => {
        const { container } = render(<Logo logo={mockData.generalInformation.logo} />, { wrapper: MemoryRouter });
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', '/upload/iblock/1a8/1a8a5771cc80a6d2ef5a93e271ebfd1f.png');
        expect(container).toMatchSnapshot();
    });

    it('sanitizeUrl has been called', () => {
        jest.spyOn(sanitizer, 'sanitizeUrl');
        render(<Logo logo={mockData.generalInformation.logo} />, { wrapper: MemoryRouter });
        expect(sanitizer.sanitizeUrl).toHaveBeenCalled();
    });

    it('should contain alt text', () => {
        render(<Logo logo={mockData.generalInformation.logo} />, { wrapper: MemoryRouter });
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('alt', 'logo');
    });

    it('should return default logo', () => {
        render(<Logo />, { wrapper: MemoryRouter });
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', 'no-image.png');
    });
});
