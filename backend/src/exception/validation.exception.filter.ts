import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrMessages, ErrorCodes } from 'app-shared';
import { AppResponse } from '../response/app.response';

export class ValidationException extends BadRequestException {
    constructor(public validationErrors: ErrMessages) {
        super();
    }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const respBody: AppResponse<null> = {
            data: null,
            error: {
                code: ErrorCodes.BAD_REQUEST,
                data: {
                    message: 'Validation error',
                    validationErrors: exception.validationErrors
                }
            }
        };

        return response.status(ErrorCodes.BAD_REQUEST).json(respBody);
    }
}
