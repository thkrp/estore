import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Reflector } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingContext } from './dto/logging.data.dto';

@Injectable()
export class UserLoggingInterceptor extends LoggingInterceptor {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        protected readonly logger: LoggerService,
        protected readonly reflector: Reflector
    ) {
        super(logger, reflector);
    }
    protected loggingContext: LoggingContext = 'USER';

    protected handleDeleteRequest() {
        const usersToDelete = Object.entries(this.loggingData.route.searchParams).map(([, value]) => value);
        this.setAdditionalLoggingData({ usersToDelete });
    }
}
