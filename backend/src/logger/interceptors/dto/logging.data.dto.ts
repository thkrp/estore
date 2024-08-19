import { LoggingLevel } from '../../enum/logging.level';
import { UserLoggingDto } from './user.logging.dto';
export type LoggingContext = 'APP' | 'USER';
export type LoggingRoute = {
    url: string;
    path: string;
    params: Record<string, string>;
    searchParams: Record<string, string>;
};
export interface LoggingDataDto {
    context: LoggingContext;
    controller: string;
    level: LoggingLevel;
    message: string;
    error?: string;
    user: UserLoggingDto;
    handler: string;
    method: string;
    route: LoggingRoute;
    [key: string]: unknown;
}
