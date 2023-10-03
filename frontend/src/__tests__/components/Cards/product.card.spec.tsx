/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockData, Product } from 'app-shared';
import * as Sanitizer from '@braintree/sanitize-url';
import ProductCard from '../../../components/Cards/ProductCard';

describe('Product card component', () => {
    let product: Product;
    beforeAll(() => {
        [product] = mockData.products.items;
    });

    it('should return null', () => {
        const { container } = render(<ProductCard />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should return a card', () => {
        const { container } = render(<ProductCard item={product} />, { wrapper: MemoryRouter });
        expect(container).toMatchSnapshot();
    });

    it('should have a sanitized link', () => {
        const sanitizeUrl = jest.spyOn(Sanitizer, 'sanitizeUrl');
        render(<ProductCard item={product} />, { wrapper: MemoryRouter });
        expect(sanitizeUrl).toBeCalled();
    });

    it('should be able to pass a class', () => {
        render(<ProductCard item={product} className="brand" />, { wrapper: MemoryRouter });
        const element = screen.getByRole('link');
        const classes = element.className.split(' ');
        expect(classes.includes('brand')).toBe(true);
    });
});
