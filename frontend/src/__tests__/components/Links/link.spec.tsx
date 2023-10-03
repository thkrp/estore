/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as sanitizer from '@braintree/sanitize-url';
import Link from '../../../components/Links/Link';

describe('Link', () => {
    afterEach(cleanup);

    it('sanitizeUrl has been called', () => {
        jest.spyOn(sanitizer, 'sanitizeUrl');
        const { container } = render(<Link to="/" />, { wrapper: MemoryRouter });
        expect(sanitizer.sanitizeUrl).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });

    it('should be able to pass a class', () => {
        render(<Link to="/" className="sanitized-link active" />, { wrapper: MemoryRouter });
        const element = screen.getByRole('link');
        const classes = element.className.split(' ');
        expect(classes.includes('sanitized-link')).toBe(true);
        expect(classes.includes('active')).toBe(true);
    });

    it('should be able to pass a title', () => {
        render(<Link to="/" title="sanitized-link" />, { wrapper: MemoryRouter });
        const element = screen.getByRole('link');
        const { title } = element;
        expect(title).toBe('sanitized-link');
    });

    it('should be able to pass a children', () => {
        render(
            <Link to="/">
                <div>LINK</div>
            </Link>,
            { wrapper: MemoryRouter }
        );
        expect(screen.getByText(/LINK/)).toBeInTheDocument();
    });
});
