/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import ContactLink from '../../../components/Links/ContactLink';

describe('ContactLink', () => {
    afterEach(cleanup);

    it('should be able to pass a class', () => {
        render(<ContactLink value="test@test.com" className="email-link" type="email" />);
        const element = screen.getByRole('link');
        const classes = element.className.split(' ');
        expect(classes.includes('email-link')).toBe(true);
    });

    it('should contain an icon', () => {
        const { container } = render(<ContactLink value="test@test.com" className="email-link" type="email" />);
        expect(screen.getByText(/.*\.(gif|jpe?g|bmp|png|svg)$/i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should be able to hide an icon', () => {
        const { container } = render(
            <ContactLink value="test@test.com" className="email-link" type="email" hiddenIcon />
        );
        expect(screen.queryByText(/.*\.(gif|jpe?g|bmp|png|svg)$/gi)).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should contain a link text', () => {
        render(<ContactLink value="test@test.com" className="email-link" type="email" />);
        expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    });

    it('should remove spaces in phone number link', () => {
        render(<ContactLink value="+38 050 000 00 00" type="phone" />);
        const element = screen.getByRole('link');
        expect(element).toHaveAttribute('href', 'tel:+380500000000');
    });
});
