import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AxiosAdapterService } from '../../../../src/axios-adapter/axios-adapter.service';
import { CatalogService } from '../../../../src/domain/catalog/catalog.service';

describe('CatalogService', () => {
    let service: CatalogService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AxiosAdapterService, CatalogService]
        }).compile();
        service = module.get<CatalogService>(CatalogService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
