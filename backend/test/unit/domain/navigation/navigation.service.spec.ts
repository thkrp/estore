import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { AxiosAdapterService } from '../../../../src/axios-adapter/axios-adapter.service';
import { NavigationService } from '../../../../src/domain/navigation/navigation.service';

describe('NavigationService', () => {
    let service: NavigationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AxiosAdapterService, NavigationService]
        }).compile();
        service = module.get<NavigationService>(NavigationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
