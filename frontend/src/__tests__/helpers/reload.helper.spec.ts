import { reload } from '../../common/helpers/reload.helper';

describe('reload helper', () => {
    const original = window.location;

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() }
        });
    });

    afterAll(() => {
        Object.defineProperty(window, 'location', { configurable: true, value: original });
    });

    it('window.location.reload should be called', () => {
        reload();
        expect(window.location.reload).toHaveBeenCalled();
    });
});
