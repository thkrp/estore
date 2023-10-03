/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../../components';

describe('footer', () => {
    const menu = mockData.bottomMenu;
    const info = mockData.generalInformation;
    it('should not be empty', () => {
        const { container } = render(<Footer menu={menu} info={info} />, { wrapper: MemoryRouter });
        expect(container).not.toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
});
