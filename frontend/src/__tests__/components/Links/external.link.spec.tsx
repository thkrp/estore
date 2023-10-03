/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import * as sanitizer from '@braintree/sanitize-url';
import ExternalLink from '../../../components/Links/ExternalLink';

describe('ExternalLink', () => {
    afterEach(cleanup);

    it('should contain target="_blank" & rel="noreferrer noopener" attributes', () => {
        render(<ExternalLink href="google.com" title="google" className="external-link" />);
        const element = screen.getByRole('link');
        expect(element).toHaveAttribute('target', '_blank');
        expect(element).toHaveAttribute('rel', 'noreferrer noopener');
    });

    it('should be able to pass a class', () => {
        render(<ExternalLink href="google.com" title="google" className="external-link" />);
        const element = screen.getByRole('link');
        const classes = element.className.split(' ');
        expect(classes.includes('external-link')).toBe(true);
    });

    it('sanitizeUrl has been called', () => {
        jest.spyOn(sanitizer, 'sanitizeUrl');
        const { container } = render(<ExternalLink href="google.com" title="google" />);
        expect(sanitizer.sanitizeUrl).toHaveBeenCalled();
        expect(container).toMatchSnapshot();
    });

    it('should be able to pass a title', () => {
        render(<ExternalLink href="google.com" title="google" className="external-link" />);
        expect(screen.getByText(/google/i)).toBeInTheDocument();
    });
});
