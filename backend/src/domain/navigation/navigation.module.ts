import { Module } from '@nestjs/common';
import { AxiosAdapter } from '../../axios-adapter/axios-adapter.module';
import { AxiosAdapterService } from '../../axios-adapter/axios-adapter.service';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';

@Module({
    imports: [AxiosAdapter],
    providers: [AxiosAdapterService, NavigationService],
    controllers: [NavigationController]
})
export class NavigationModule {}
