/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Language from '../../components/Language';
import { reload } from '../../common/helpers/reload.helper';

jest.mock('../../common/helpers/reload.helper');
describe('Localization', () => {
    afterEach(cleanup);
    const activeClass = 'active';

    it('default language should be ukrainian', () => {
        window.localStorage.clear();
        render(<Language />);
        const ua = screen.getByText('ua');
        const ru = screen.getByText('ru');
        const en = screen.getByText('en');
        expect(ua).toHaveClass(activeClass);
        expect(ru).not.toHaveClass(activeClass);
        expect(en).not.toHaveClass(activeClass);
    });

    it('should be able to change a language', () => {
        window.localStorage.clear();
        (reload as jest.Mock).mockImplementationOnce(jest.fn);
        render(<Language />);
        const ua = screen.getByText('ua');
        const ru = screen.getByText('ru');
        const en = screen.getByText('en');
        expect(ua).toHaveClass(activeClass);
        expect(ru).not.toHaveClass(activeClass);
        expect(en).not.toHaveClass(activeClass);
        fireEvent.click(en);
        cleanup();
        render(<Language />);
        const rerenderedUa = screen.getByText('ua');
        const rerenderedRu = screen.getByText('ru');
        const rerenderedEn = screen.getByText('en');
        expect(rerenderedEn).toHaveClass(activeClass);
        expect(rerenderedRu).not.toHaveClass(activeClass);
        expect(rerenderedUa).not.toHaveClass(activeClass);
    });
});
