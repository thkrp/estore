import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { Localization } from 'app-shared';
import { AxiosAdapterService } from '../../../../src/axios-adapter/axios-adapter.service';
import { TranslationService } from '../../../../src/domain/translation/translation.service';
import ruTranslation from '../../translations/ru';
import enTranslation from '../../translations/en';
import uaTranslation from '../../translations/ua';

describe('TranslationService', () => {
    let service: TranslationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [AxiosAdapterService, TranslationService]
        }).compile();
        service = module.get<TranslationService>(TranslationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return default localization if locale does not exist', () => {
        expect(service.getTranslation(null)).toEqual(uaTranslation);
    });

    it('should return ru localization', () => {
        expect(service.getTranslation('ru')).toEqual(ruTranslation);
    });

    it('should return en localization', () => {
        expect(service.getTranslation('en')).toEqual(enTranslation);
    });

    it('should return ru localization', () => {
        expect(service.getTranslation('ua')).toEqual(uaTranslation);
    });

    it('should return hash string', () => {
        expect(typeof service.getTranslationHash(Localization.ru)).toBeTruthy();
    });
});
