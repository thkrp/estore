import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Reflector } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';

@Injectable()
export class AppLoggingInterceptor extends LoggingInterceptor {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        protected readonly logger: LoggerService,
        protected readonly reflector: Reflector
    ) {
        super(logger, reflector);
    }
}
