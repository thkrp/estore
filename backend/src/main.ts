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
import { isNotProduction } from 'app-shared';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { JwtGuard } from './domain/auth/guards/jwt.guard';
import { ValidationException, ValidationFilter } from './exception/validation.exception.filter';
import { GlobalExceptionFilter } from './exception/global.exception.filter';
import { RolesGuard } from './domain/auth/guards/role.guard';
import { IsActiveGuard } from './domain/auth/guards/is.active.guard';
import { parsErrors } from './utils/parse.errors.utils';

const setupGuards = (app: INestApplication) => {
    const jwtGuard = app.get(JwtGuard);
    const rolesGuard = app.get(RolesGuard);
    const isActiveGuard = app.get(IsActiveGuard);
    app.useGlobalGuards(jwtGuard, rolesGuard, isActiveGuard);
};

const setupValidation = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                const errMsg = parsErrors(errors);
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
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    setupGuards(app);
    setupSwagger(app);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: configService.get('FRONTEND_ORIGIN')
    });
    app.use(helmet());
    setupValidation(app);
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    await app.listen(configService.get('SERVER_PORT') || 3000);
}
bootstrap().catch(err => console.error(err));
