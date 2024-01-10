import { BadRequestException, Controller, Get, Param, Query, Version } from '@nestjs/common';
import { FilterParams } from 'app-shared';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '../auth/decorators/public.route';
import { CatalogService } from './catalog.service';

@PublicRoute()
@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Version('1')
    @ApiTags('bitrix')
    @Get('/best-sales')
    async getBestSales() {
        try {
            return {
                data: await this.catalogService.getBestSales()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/arrivals')
    async getNew(@Query() { pageNumber }: { pageNumber: number }) {
        try {
            return {
                data: await this.catalogService.getArrivals(pageNumber)
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/discounted')
    async getDiscounted(@Query() { pageNumber }: { pageNumber: number }) {
        try {
            return {
                data: await this.catalogService.getDiscounted(pageNumber)
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/brands')
    async getBrands() {
        try {
            return {
                data: await this.catalogService.getBrands()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/products')
    async getProducts(@Query() query: FilterParams) {
        try {
            return {
                data: await this.catalogService.getProducts(query)
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Version('1')
    @ApiTags('bitrix')
    @Get('/products/:code')
    async getProductByCode(@Param() { code }: { code: string }) {
        try {
            return {
                data: await this.catalogService.getProductByCode(code)
            };
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}
