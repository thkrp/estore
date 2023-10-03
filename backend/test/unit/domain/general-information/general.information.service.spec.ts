import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { GeneralInformationService } from '../../../../src/domain/general-information/general-information.service';
import { AxiosAdapterService } from '../../../../src/axios-adapter/axios-adapter.service';

describe('GeneralInformationService', () => {
    let service: GeneralInformationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AxiosAdapterService, GeneralInformationService]
        }).compile();
        service = module.get<GeneralInformationService>(GeneralInformationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
