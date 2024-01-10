import { Localization } from 'app-shared';
import { localStorageService } from '../../services/local-storage';

describe('local storage service', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('add string to local storage', () => {
        const id = '123';
        const data = 'some string';
        localStorageService.set(id, data);
        expect(window.localStorage.getItem(id)).toEqual(data);
    });

    it('receive string from local storage', () => {
        const id = '123';
        const data = 'some string';
        window.localStorage.setItem(id, data);
        expect(localStorageService.get(id)).toEqual(data);
    });

    it('overwrite data in local storage', () => {
        const id = '123';
        const oldData = 'example';
        const newData = 'new';
        window.localStorage.setItem(id, oldData);
        localStorageService.set(id, newData);

        expect(window.localStorage.getItem(id)).toEqual(newData);
    });

    it('remove data from local storage', () => {
        const id = '123';
        const data = 'some string';
        window.localStorage.setItem(id, data);
        localStorageService.remove(id);

        expect(window.localStorage.getItem(id)).toBe(null);
    });

    it('add array to local storage', () => {
        const id = '123';
        const data = ['1'];
        localStorageService.setObject(id, data);

        expect(window.localStorage.getItem(id)).toEqual(JSON.stringify(data));
    });

    it('add object to local storage', () => {
        const id = '123';
        const data = { data: 1 };
        localStorageService.setObject(id, data);

        expect(window.localStorage.getItem(id)).toEqual(JSON.stringify(data));
    });

    it('receive array from local storage', () => {
        const id = '123';
        const data = ['1'];
        window.localStorage.setItem(id, JSON.stringify(data));

        expect(localStorageService.getObject(id)).toEqual(data);
    });

    it('receive object from local storage', () => {
        const id = '123';
        const data = { data: 1 };
        window.localStorage.setItem(id, JSON.stringify(data));

        expect(localStorageService.getObject(id)).toEqual(data);
    });

    it('receive default localization', () => {
        const localization = localStorageService.getLocalization();
        expect(localization).toEqual(Localization.ua);
    });

    it('receive localization', () => {
        window.localStorage.setItem('localization', Localization.en);
        expect(localStorageService.getLocalization()).toEqual(Localization.en);
    });

    it('set localization', () => {
        localStorageService.setLocalization(Localization.ua);
        expect(window.localStorage.getItem('localization')).toEqual(Localization.ua);
    });
});
