import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ErrorCodes } from 'app-shared';
import { AppResponse } from '../../app.response';

export const ApiAppResponse = <DataDto extends Type<unknown>>(options: ApiResponseOptions, dataDto: DataDto) =>
    applyDecorators(
        ApiExtraModels(AppResponse, dataDto),
        ApiResponse({
            ...options,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(AppResponse) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(dataDto) },
                            error: {
                                properties: {
                                    code: {
                                        enum: [ErrorCodes]
                                    },
                                    data: {
                                        properties: {
                                            message: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })
    );
