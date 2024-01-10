import { BadRequestException, Controller, Get, Version } from '@nestjs/common';
import { BottomMenu, CatalogMenu, TopMenu } from 'app-shared';
import { PublicRoute } from '../auth/decorators/public.route';
import { AppResponse } from '../../response/app.response';
import { NavigationService } from './navigation.service';
import { ApiTags } from '@nestjs/swagger';

@PublicRoute()
@Controller('navigation')
export class NavigationController {
    constructor(private readonly navigateService: NavigationService) {}

    @Version('1')
    @ApiTags('bitrix')
    @Get('/top-menu')
    async fetchTopMenu(): Promise<AppResponse<TopMenu>> {
        try {
            return {
                data: await this.navigateService.fetchTopMenu()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/bottom-menu')
    async fetchBottomMenu(): Promise<AppResponse<BottomMenu>> {
        try {
            return {
                data: await this.navigateService.fetchBottomMenu()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/catalog-menu')
    async fetchCatalogMenu(): Promise<AppResponse<CatalogMenu>> {
        try {
            return {
                data: await this.navigateService.fetchCatalogMenu()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
