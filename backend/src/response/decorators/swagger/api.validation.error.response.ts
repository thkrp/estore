import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ErrorCodes } from 'app-shared';
import { AppResponse } from '../../app.response';
export const ApiValidationErrorResponse = (description: string = 'Validation Error') =>
    applyDecorators(
        ApiExtraModels(AppResponse),
        ApiBadRequestResponse({
            description,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(AppResponse) },
                    {
                        properties: {
                            error: {
                                properties: {
                                    code: {
                                        enum: [ErrorCodes.BAD_REQUEST]
                                    },
                                    data: {
                                        properties: {
                                            message: {
                                                type: 'string'
                                            },
                                            validationErrors: {
                                                additionalProperties: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string'
                                                    }
                                                },
                                                example: {
                                                    password: ['password is too weak'],
                                                    email: ['email must be an email'],
                                                    additionalProperty: [
                                                        'additionalProperty error1',
                                                        'additionalProperty error2'
                                                    ]
                                                }
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
