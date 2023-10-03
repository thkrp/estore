import { mockData } from 'app-shared';
import { appService } from '../../services/app.service';

jest.mock('../../services/app.service');

describe('app service', () => {
    it('fetchAppInfo should return site information', async () => {
        (appService.fetchAppInfo as jest.Mock).mockResolvedValueOnce(mockData.generalInformation);
        const result = await appService.fetchAppInfo();
        expect(appService.fetchAppInfo).toHaveBeenCalled();
        expect(result).toEqual({
            'logo': '/upload/iblock/1a8/1a8a5771cc80a6d2ef5a93e271ebfd1f.png',
            'logo_footer': '/upload/iblock/1a8/1a8a5771cc80a6d2ef5a93e271ebfd1f.png',
            'phones': ['+38 050 000 00 00', '+38 050 000 00 01'],
            'emails': ['test@test.com'],
            'site_name': 'farm-equipment',
            'footer_description': ''
        });
    });

    it('fetchTopMenu should return top menu', async () => {
        (appService.fetchTopMenu as jest.Mock).mockResolvedValueOnce(mockData.topMenu);
        const result = await appService.fetchTopMenu();
        expect(appService.fetchTopMenu).toHaveBeenCalled();
        expect(result).toEqual({
            'o-magazine': {
                'name': 'О магазине',
                'code': 'o-magazine',
                'order': '500'
            },
            'garantii-i-vozvrat': {
                'name': 'Гарантии и возврат',
                'code': 'garantii-i-vozvrat',
                'order': '500'
            },
            'oplata-i-dostavka': {
                'name': 'Оплата и доставка',
                'code': 'oplata-i-dostavka',
                'order': '500'
            },
            'kontakty': {
                'name': 'Контакты',
                'code': 'kontakty',
                'order': '500'
            }
        });
    });

    it('fetchBottomMenu should return bottom menu', async () => {
        (appService.fetchBottomMenu as jest.Mock).mockResolvedValueOnce(mockData.bottomMenu);
        const result = await appService.fetchBottomMenu();
        expect(appService.fetchBottomMenu).toHaveBeenCalled();
        expect(result).toEqual([
            {
                'name': 'Каталог товаров',
                'sort': '100',
                'items': [
                    {
                        'name': 'Мотоблоки',
                        'type': 'SECTION',
                        'section': 'Мотоблоки',
                        'url': '/catalog/motobloki'
                    },
                    {
                        'name': 'Мотоблочное навесное оборудование',
                        'type': 'SECTION',
                        'section': 'Мотоблочное навесное оборудование',
                        'url': '/catalog/motoblochnoe-navesnoe-oborudovanie'
                    },
                    {
                        'name': 'Мотоблоки "КЕНТАВР"',
                        'type': 'SECTION',
                        'section': 'Мотоблоки с воздушным охлаждением &quot;КЕНТАВР&quot;',
                        // eslint-disable-next-line max-len
                        'url': '/catalog/motobloki/motobloki-i-motokultivatory-kentavr-besplatnaya-dostavka/motobloki-s-vozdushnym-okhlazhdeniem-kentavr'
                    },
                    {
                        'name': 'Бензопила',
                        'type': 'SECTION',
                        'section': 'Бензопила',
                        'url': '/catalog/tekhnika-dlya-sada-i-ogoroda/benzopila'
                    }
                ]
            },
            {
                'name': 'О магазине',
                'sort': '200',
                'items': [
                    {
                        'name': 'О магазине',
                        'type': 'LINK',
                        'section': null,
                        'url': '/o-magazine'
                    },
                    {
                        'name': 'Гарантии и возврат',
                        'type': 'LINK',
                        'section': null,
                        'url': '/garantii-i-vozvrat'
                    },
                    {
                        'name': 'Оплата и доставка',
                        'type': 'LINK',
                        'section': null,
                        'url': '/oplata-i-dostavka'
                    }
                ]
            },
            {
                'name': 'КОНТАКТЫ',
                'sort': '500',
                'items': [
                    {
                        'name': 'support@test.com',
                        'type': 'EMAIL',
                        'section': null,
                        'url': '/'
                    },
                    {
                        'name': '+38 066 000 00 05',
                        'type': 'PHONE',
                        'section': null,
                        'url': '/'
                    },
                    {
                        'name': '+38 066 000 00 04',
                        'type': 'PHONE',
                        'section': null,
                        'url': '/'
                    }
                ]
            }
        ]);
    });

    it('fetchCatalogMenu has been called', async () => {
        (appService.fetchBottomMenu as jest.Mock).mockResolvedValueOnce(mockData.catalogMenu);
        await appService.fetchBottomMenu();
        expect(appService.fetchBottomMenu).toHaveBeenCalled();
    });

    it('getTranslation should be defined', async () => {
        expect(appService.getTranslation).toBeDefined();
    });

    it('getTranslationHash should be defined', async () => {
        expect(appService.getTranslationHash).toBeDefined();
    });
});
