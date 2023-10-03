import { Module } from '@nestjs/common';
import { AxiosAdapter } from '../../axios-adapter/axios-adapter.module';
import { AxiosAdapterService } from '../../axios-adapter/axios-adapter.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
    imports: [AxiosAdapter],
    providers: [AxiosAdapterService, CatalogService],
    controllers: [CatalogController]
})
export class CatalogModule {}
