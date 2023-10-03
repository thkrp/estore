/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Container } from '../../components';

describe('container', () => {
    it('should not be empty', () => {
        const { container } = render(<Container>Test</Container>);
        expect(container).not.toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
});
