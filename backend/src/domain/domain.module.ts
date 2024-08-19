import { LoggerService, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppLoggingInterceptor } from '../logger/interceptors/app.logging.interceptor';
import { GeneralInformationModule } from './general-information/general-information.module';
import { NavigationModule } from './navigation/navigation.module';
import { CatalogModule } from './catalog/catalog.module';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh.token.module';

@Module({
    imports: [
        GeneralInformationModule,
        NavigationModule,
        CatalogModule,
        TranslationModule,
        UserModule,
        AuthModule,
        RefreshTokenModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useFactory: (logger: LoggerService, reflector: Reflector) => {
                return new AppLoggingInterceptor(logger, reflector);
            },
            inject: [WINSTON_MODULE_NEST_PROVIDER, Reflector]
        }
    ]
})
export class DomainModule {}
