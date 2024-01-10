import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import {
    INestApplication,
    NestApplicationOptions,
    ValidationError,
    ValidationPipe,
    VersioningType
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrMessages, isNotProduction } from 'app-shared';
import { AppModule } from './app.module';
import { JwtGuard } from './domain/auth/guards/jwt.guard';
import { ValidationException, ValidationFilter } from './exception/validation.exception.filter';
import { GlobalExceptionFilter } from './exception/global.exception.filter';

const setupGuards = (app: INestApplication) => {
    const jwtGuard = app.get(JwtGuard);
    app.useGlobalGuards(jwtGuard);
};

const setupValidation = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                const errMsg: ErrMessages = {};
                errors.forEach(err => {
                    errMsg[err.property] = err.constraints ? [...Object.values(err.constraints)] : [];
                });
                return new ValidationException(errMsg);
            }
        })
    );
};

const setupSwagger = (app: INestApplication) => {
    const configService: ConfigService = app.get(ConfigService);
    if (isNotProduction(configService.get('MODE'))) {
        const document = SwaggerModule.createDocument(
            app,
            new DocumentBuilder().setTitle('app').setDescription('app api').build()
        );

        SwaggerModule.setup('docs', app, document);
    }
};

const appOptions: NestApplicationOptions = {
    abortOnError: false
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule, appOptions);
    const configService: ConfigService = app.get(ConfigService);
    app.enableVersioning({
        type: VersioningType.URI
    });
    app.useGlobalFilters(new GlobalExceptionFilter(), new ValidationFilter());
    setupGuards(app);
    setupSwagger(app);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: configService.get('FRONTEND_ORIGIN')
    });
    app.use(helmet());
    setupValidation(app);
    await app.listen(configService.get('SERVER_PORT') || 3000);
}
bootstrap().catch(err => console.error(err));
