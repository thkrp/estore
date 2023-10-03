import React, { FC } from 'react';

type Props = {
    value: string;
    onChange?: (v: string) => void;
    name?: string;
    placeholder?: string;
    className?: string;
};

/**
 * A text input with limited properties for security.
 * */
const InputText: FC<Props> = ({ value, onChange = () => {}, placeholder, name, className }) => {
    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            type="text"
            name={name}
            placeholder={placeholder}
            className={className}
        />
    );
};

export default InputText;
