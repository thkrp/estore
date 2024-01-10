import { AppResponse as IAppResponse, AppError as IAppError, ErrorCodes, ErrMessages } from 'app-shared';
import { ApiProperty } from '@nestjs/swagger';

export class AppError implements IAppError {
    @ApiProperty()
    code: ErrorCodes | number;
    @ApiProperty()
    data: {
        message: string;
        [x: string]: string | ErrMessages;
    };
}

export class AppResponse<T> implements IAppResponse<T> {
    @ApiProperty()
    data?: T;
    @ApiProperty()
    error?: AppError;
}
