import { ErrorCodes } from '../enums';

export type ErrMessages = Record<string, string[]>
export interface AppError {
    code: ErrorCodes | number;
    data: {
        message: string;
        [x: string]: string | ErrMessages;
    };
}

export interface AppResponse<T> {
    data?: T;
    error?: AppError;
}