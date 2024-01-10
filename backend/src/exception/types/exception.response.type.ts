import { AppError } from '../../response/app.response';

export type ExceptionResponse = string | object | Error | AppError | undefined;

export function isAppError(exceptionResponse: string | object | AppError): exceptionResponse is AppError {
    if (typeof exceptionResponse === 'string') {
        return false;
    }
    return 'code' in exceptionResponse || 'data' in exceptionResponse;
}
