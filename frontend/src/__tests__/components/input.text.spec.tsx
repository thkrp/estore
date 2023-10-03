/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import InputText from '../../components/InputText';

describe('input text', () => {
    afterEach(cleanup);

    it('should be defined', () => {
        const { container } = render(<InputText value="" />);
        expect(container).toBeDefined();
    });

    it('type of input should be "text"', () => {
        render(<InputText value="" />);
        const element = screen.getByRole('textbox');
        expect(element).toHaveAttribute('type', 'text');
    });

    it('should contain disabled spellCheck, autoComplete, autoCorrect, autoCapitalize attributes', () => {
        render(<InputText value="" />);
        const element = screen.getByRole('textbox');
        expect(element).toHaveAttribute('spellCheck', 'false');
        expect(element).toHaveAttribute('autoCorrect', 'off');
        expect(element).toHaveAttribute('autoComplete', 'off');
        expect(element).toHaveAttribute('autoCapitalize', 'off');
    });

    it('should be able to pass a class', () => {
        render(<InputText value="" className="input focused" />);
        const element = screen.getByRole('textbox');
        const classes = element.className.split(' ');
        expect(classes.includes('input')).toBe(true);
        expect(classes.includes('focused')).toBe(true);
    });

    it('should be able to pass a placeholder', () => {
        render(<InputText value="" placeholder="email" />);
        const element = screen.getByRole('textbox');
        expect(element).toHaveAttribute('placeholder', 'email');
    });

    it('should be able to pass a name', () => {
        render(<InputText value="" name="email" />);
        const element = screen.getByRole('textbox');
        expect(element).toHaveAttribute('name', 'email');
    });

    it('should be able to pass onChange', () => {
        const onChange = jest.fn();
        render(<InputText value="" onChange={onChange} />);
        const element = screen.getByRole('textbox');
        fireEvent.change(element, { target: { value: 'test' } });
        expect(onChange).toHaveBeenCalled();
    });
});
