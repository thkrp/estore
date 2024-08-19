import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common/interfaces';
import { LoggerService } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ErrorResponse, HttpMethod } from 'app-shared';
import { ApplicationException } from '../../exception/application.exception';
import { LOGGING_INTERCEPTORS_KEY } from '../decorators/use.logging.interceptors';
import { sanitizeLoggingSearchParams } from '../../utils/logging.utils';
import { JwtTokenPayloadDto } from '../../domain/auth/dto/jwt.token.payload.dto';
import { LoggingLevel } from '../enum/logging.level';
import { UserLoggingDto } from './dto/user.logging.dto';
import { RequestDto } from './dto/request.dto';
import { LoggingContext, LoggingDataDto, LoggingRoute } from './dto/logging.data.dto';

export abstract class LoggingInterceptor implements NestInterceptor {
    protected constructor(
        protected readonly logger: LoggerService,
        protected readonly reflector: Reflector
    ) {}

    protected context: ExecutionContext;
    protected loggingContext: LoggingContext = 'APP';
    protected loggingData: LoggingDataDto;

    protected handlePostRequest() {
        // handle post requests
    }

    protected handleGetRequest() {
        // handle get requests
    }

    protected handlePutRequest() {
        // handle put requests
    }

    protected handleDeleteRequest() {
        // handle delete requests
    }

    #handleRequestByMethod(method: HttpMethod): void {
        switch (method) {
            case HttpMethod.POST:
                this.handlePostRequest();
                break;
            case HttpMethod.GET:
                this.handleGetRequest();
                break;
            case HttpMethod.PUT:
                this.handlePutRequest();
                break;
            case HttpMethod.DELETE:
                this.handleDeleteRequest();
                break;
        }
    }

    #extractUser(user?: JwtTokenPayloadDto): UserLoggingDto {
        return {
            id: user?.sub || '',
            role: user?.role || 'CLIENT'
        };
    }

    #extractRoute(req: RequestDto): LoggingRoute {
        const {
            originalUrl,
            path,
            params,
            route: { path: routePath }
        } = req;
        const searchParams = sanitizeLoggingSearchParams(originalUrl, path);
        return {
            url: originalUrl,
            path: routePath,
            params,
            searchParams
        };
    }

    #extractController(): string {
        return this.context.getClass().name || '';
    }

    #extractHandler(): string {
        return this.context.getHandler().name;
    }

    #shouldSkip(interceptors: string[]): boolean {
        const controllerName = this.#extractController().split('Controller')[0];
        return (
            interceptors.includes(`${controllerName}LoggingInterceptor`) &&
            controllerName.toUpperCase() !== this.loggingContext
        );
    }

    #getInterceptors(context: ExecutionContext): string[] {
        const classInterceptors = this.reflector.getAllAndMerge(LOGGING_INTERCEPTORS_KEY, [context.getClass()]) || [];
        const handlerInterceptors =
            this.reflector.getAllAndMerge(LOGGING_INTERCEPTORS_KEY, [context.getHandler()]) || [];
        return [...classInterceptors, ...handlerInterceptors].map(i => i.name || i.constructor.name);
    }

    #initializeLoggingData(req: RequestDto) {
        const handler = this.#extractHandler();
        const controller = this.#extractController();
        const user = this.#extractUser(req.user);
        const route = this.#extractRoute(req);
        const method = req.method as HttpMethod;

        this.loggingData = {
            context: this.loggingContext,
            controller,
            level: LoggingLevel.info,
            handler,
            message: '',
            user,
            method,
            route
        };
        this.#handleRequestByMethod(method);
    }

    protected setAdditionalLoggingData(data: { [key: string]: unknown }): void {
        this.loggingData = { ...this.loggingData, ...data };
    }

    protected logAttempt() {
        this.logger.log({
            ...this.loggingData,
            message: `Attempt to ${this.loggingData.method} ${this.loggingData.route.path}`
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    protected logSuccess(data?: any) {
        this.logger.log({
            ...this.loggingData,
            message: `Successfully ${this.loggingData.method} ${this.loggingData.route.url}`
        });
    }

    protected logFail(e: ApplicationException) {
        const response = e.getResponse() as ErrorResponse;
        this.logger.log({
            ...this.loggingData,
            level: LoggingLevel.error,
            message: `Failed to ${this.loggingData.method} ${this.loggingData.route.url}`,
            error: response.message || response.data?.message
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        this.context = context;
        const interceptors = this.#getInterceptors(context);

        if (this.#shouldSkip(interceptors)) {
            return next.handle();
        }
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<RequestDto>();
        this.#initializeLoggingData(req);
        this.logAttempt();
        return next.handle().pipe(
            map(data => {
                this.logSuccess(data);
                return data;
            }),
            catchError((e: ApplicationException) => {
                this.logFail(e);
                return throwError(() => ApplicationException.wrapError(e));
            })
        );
    }
}
