import { SetMetadata, UseInterceptors } from '@nestjs/common';

export const LOGGING_INTERCEPTORS_KEY = 'logging_interceptors';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoggingInterceptors = (...interceptors: any[]) => SetMetadata(LOGGING_INTERCEPTORS_KEY, interceptors);
/**
 To avoid duplication of log entries, the controller and logger classes should have the same prefix in their names, such as UserController and UserLoggingInterceptor.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UseLoggingInterceptors(...interceptors: any[]): MethodDecorator & ClassDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, key?: string | symbol, descriptor?: PropertyDescriptor) => {
        if (key && descriptor) {
            UseInterceptors(...interceptors)(target, key, descriptor);
        } else {
            UseInterceptors(...interceptors)(target);
        }
        if (key && descriptor) {
            LoggingInterceptors(...interceptors)(target, key, descriptor);
        } else {
            LoggingInterceptors(...interceptors)(target);
        }
    };
}
