import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppResponse, BottomMenu, CatalogMenu, TopMenu } from 'app-shared';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
    constructor(private readonly navigateService: NavigationService) {}

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
