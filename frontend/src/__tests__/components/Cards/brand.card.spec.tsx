/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Brand, mockData } from 'app-shared';
import * as Sanitizer from '@braintree/sanitize-url';
import BrandCard from '../../../components/Cards/BrandCard';

describe('Brand card component', () => {
    let brand: Brand;
    beforeAll(() => {
        [brand] = mockData.brands;
    });

    it('should return null', () => {
        const { container } = render(<BrandCard />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should return a card', () => {
        const { container } = render(<BrandCard item={brand} />, { wrapper: MemoryRouter });
        expect(container).toMatchSnapshot();
    });

    it('should have a sanitized link', () => {
        const sanitizeUrl = jest.spyOn(Sanitizer, 'sanitizeUrl');
        render(<BrandCard item={brand} />, { wrapper: MemoryRouter });
        expect(sanitizeUrl).toBeCalled();
    });

    it('should be able to pass a class', () => {
        render(<BrandCard item={brand} className="brand" />, { wrapper: MemoryRouter });
        const element = screen.getByRole('link');
        const classes = element.className.split(' ');
        expect(classes.includes('brand')).toBe(true);
    });
});
