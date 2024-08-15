import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes, ErrorMessages } from 'app-shared';

export class ApplicationException extends HttpException {
    private constructor(httpStatus: HttpStatus, message?: string, applicationCode?: ErrorCodes) {
        super(
            {
                code: applicationCode || ErrorCodes.BAD_REQUEST,
                data: {
                    message: message || ErrorMessages.UnknownApplicationError
                }
            },
            httpStatus
        );
    }

    public static badRequest(message: string = ErrorMessages.BadRequest): ApplicationException {
        return new ApplicationException(HttpStatus.BAD_REQUEST, message, ErrorCodes.BAD_REQUEST);
    }

    public static unauthorized(message: string = ErrorMessages.Unauthorized): ApplicationException {
        return new ApplicationException(HttpStatus.UNAUTHORIZED, message, ErrorCodes.UNAUTHORIZED);
    }

    public static loginError(message: string = ErrorMessages.InvalidLogin): ApplicationException {
        return new ApplicationException(HttpStatus.BAD_REQUEST, message, ErrorCodes.BAD_REQUEST);
    }

    public static serverSideError(message?: string): ApplicationException {
        return new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR, message, ErrorCodes.SERVER_SIDE_ERROR);
    }

    public static wrapError(error?: Error): ApplicationException {
        if (error instanceof ApplicationException) {
            return error;
        }

        return ApplicationException.serverSideError(error?.message);
    }
}
