import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCodes, ErrorMessages } from 'app-shared';
import { AppResponse } from '../response/app.response';
import { ApplicationException } from './application.exception';
import { ExceptionResponse, isAppError } from './types/exception.response.type';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    #createResponseBody = (
        status: number | ErrorCodes,
        exceptionResponse: ExceptionResponse = ErrorMessages.UnknownError
    ): AppResponse<null> => {
        return {
            data: null,
            error: {
                code: isAppError(exceptionResponse) ? exceptionResponse.code : status || ErrorCodes.BAD_REQUEST,
                data: {
                    message: isAppError(exceptionResponse)
                        ? exceptionResponse?.data?.message
                        : (exceptionResponse as Error)?.message || ErrorMessages.UnknownError
                }
            }
        };
    };

    catch(exception: ApplicationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = typeof exception.getStatus === 'function' ? exception.getStatus() : ErrorCodes.SERVER_SIDE_ERROR;
        const exceptionResponse = typeof exception.getResponse === 'function' ? exception.getResponse() : undefined;

        const respBody = this.#createResponseBody(status, exceptionResponse);
        const { originalUrl } = request;
        console.error(`Error occurred at url ${originalUrl}: ${JSON.stringify(respBody)}`);
        return response.status(status).json(respBody);
    }
}
