import { defaultLocalization, Localization } from 'app-shared';

class LocalStorageService {
    readonly #localizationKey = 'localization';

    readonly #viewedKey = 'viewed';

    readonly #viewedMax = 10;

    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    setObject(key: string, value: object | []) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getObject(key: string) {
        const str = localStorage.getItem(key);
        if (str) {
            return JSON.parse(str);
        }

        return null;
    }

    setLocalization(localization: Localization) {
        return this.set(this.#localizationKey, localization);
    }

    getLocalization() {
        const currentLocalization = this.get(this.#localizationKey);
        return currentLocalization && currentLocalization in Localization ? currentLocalization : defaultLocalization;
    }

    getViewedItems(): string[] {
        return this.getObject(this.#viewedKey) || [];
    }

    addViewedItem(code: string) {
        const viewedItems = this.getViewedItems();
        const updatedItems = new Set([code, ...viewedItems]);
        this.setObject(this.#viewedKey, [...updatedItems].slice(0, this.#viewedMax));
    }
}

export const localStorageService = new LocalStorageService();
