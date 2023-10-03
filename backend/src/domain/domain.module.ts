import { Module } from '@nestjs/common';
import { GeneralInformationModule } from './general-information/general-information.module';
import { NavigationModule } from './navigation/navigation.module';
import { CatalogModule } from './catalog/catalog.module';
import { TranslationModule } from './translation/translation.module';

@Module({
    imports: [GeneralInformationModule, NavigationModule, CatalogModule, TranslationModule]
})
export class DomainModule {}
