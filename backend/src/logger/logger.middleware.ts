import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl, path, baseUrl } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('finish', () => {
            const { statusCode, statusMessage } = response;
            const contentLength = response.get('content-length');
            this.logger.log({
                url: originalUrl || baseUrl || path,
                method,
                contentLength,
                userAgent,
                ip,
                statusCode,
                statusMessage
            });
        });

        next();
    }
}
