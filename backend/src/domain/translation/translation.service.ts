import { Injectable } from '@nestjs/common';
import { defaultLocalization, Localization, TranslationHashes, Translations } from 'app-shared';
import ruTranslation from '../../translations/ru';
import enTranslation from '../../translations/en';
import uaTranslation from '../../translations/ua';
import { stringHash } from '../../utils/encription.utils';

@Injectable()
export class TranslationService {
    readonly #translations: Translations;
    readonly #translationHashes: TranslationHashes;
    constructor() {
        this.#translations = {
            [Localization.ru]: ruTranslation,
            [Localization.en]: enTranslation,
            [Localization.ua]: uaTranslation
        };
        this.#translationHashes = {
            [Localization.ru]: stringHash(JSON.stringify(ruTranslation)),
            [Localization.en]: stringHash(JSON.stringify(enTranslation)),
            [Localization.ua]: stringHash(JSON.stringify(uaTranslation))
        };
    }

    getTranslation(locale: keyof Translations) {
        return this.#translations[locale] || this.#translations[defaultLocalization];
    }

    getTranslationHash(locale?: Localization) {
        if (!locale) {
            return this.#translationHashes[defaultLocalization];
        }
        return this.#translationHashes[locale] || this.#translationHashes[defaultLocalization];
    }
}
