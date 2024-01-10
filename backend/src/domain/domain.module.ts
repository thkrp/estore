import { Module } from '@nestjs/common';
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
    ]
})
export class DomainModule {}
