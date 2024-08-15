import { Entries } from '../types/object.entries.generic';

export const getKeyByValue = <T extends {}>(obj: T, value: T[keyof T]) => {
    const indexOfEnums = Object.values(obj).indexOf(value);

    return Object.keys(obj)[indexOfEnums] as keyof typeof obj;
};

export const removeUndefinedProps = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
    return (Object.entries(obj) as Entries<T>).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {} as T);
};
