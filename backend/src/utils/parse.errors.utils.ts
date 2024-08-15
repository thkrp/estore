import { ValidationError } from '@nestjs/common';
import { ErrMessage } from 'app-shared';

export const parsErrors = (errors: ValidationError[], errMessages: ErrMessage[] = []): ErrMessage[] => {
    errors.forEach(err => {
        if (err.children?.length) {
            parsErrors(err.children, errMessages);
        }
        if (err.constraints) {
            errMessages.push({
                [err.property]: [...Object.values(err.constraints)]
            });
        }
    });
    return errMessages;
};
