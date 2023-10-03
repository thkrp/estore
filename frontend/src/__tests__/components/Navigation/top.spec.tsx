/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import * as sanitizer from '@braintree/sanitize-url';
import { TopNav } from '../../../components';

describe('TopNav', () => {
    afterEach(cleanup);

    it('should be defined', () => {
        const { container } = render(<TopNav menu={mockData.topMenu} />, { wrapper: MemoryRouter });
        expect(container).toBeDefined();
        expect(container).toMatchSnapshot();
    });

    it('sanitizeUrl has been called', () => {
        jest.spyOn(sanitizer, 'sanitizeUrl');
        render(<TopNav menu={mockData.topMenu} />, { wrapper: MemoryRouter });
        expect(sanitizer.sanitizeUrl).toHaveBeenCalled();
    });

    it('should return null if no menu', () => {
        const { container } = render(<TopNav />, { wrapper: MemoryRouter });
        expect(container).toBeEmptyDOMElement();
    });
});
