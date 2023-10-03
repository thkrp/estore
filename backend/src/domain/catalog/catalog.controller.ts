import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

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

    @Get('/products/:code')
    async getProductByCode(@Param() { code }) {
        try {
            return {
                data: await this.catalogService.getProductByCode(code)
            };
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @Get('/arrivals')
    async getNew() {
        try {
            return {
                data: await this.catalogService.getArrivals()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @Get('/discounted')
    async getDiscounted() {
        try {
            return {
                data: await this.catalogService.getDiscounted()
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }

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

    @Get('/products')
    async getProducts(@Query() query: { section?: string }) {
        try {
            return {
                data: await this.catalogService.getProducts(query)
            };
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
