import { triggerStatePropertyLoaderHandler, triggerLoaderHandler } from '../../../store/handlers';

type State = Record<string, {}> & { isLoading: boolean };
type TriggerElementLoaderPayload = { isLoading: boolean; element: string };

describe('triggerLoaderHandler', () => {
    let state: State;
    beforeEach(() => {
        state = {
            isLoading: true
        };
    });

    it('isLoading should be true', () => {
        const payload = true;
        expect(triggerLoaderHandler(state, payload)).toEqual({ ...state, isLoading: true });
    });

    it('isLoading should be false', () => {
        const payload = false;
        expect(triggerLoaderHandler(state, payload)).toEqual({ ...state, isLoading: false });
    });
});

describe('triggerStatePropertyLoaderHandler', () => {
    let state: State;
    let payload: TriggerElementLoaderPayload;
    const elementName = 'bestSales';
    beforeEach(() => {
        payload = {
            isLoading: true,
            element: elementName
        };
        state = {
            [elementName]: {
                items: [],
                isLoading: true
            },
            isLoading: false
        };
    });

    it('isLoading of state element should be true', () => {
        const isLoading = true;
        expect(triggerStatePropertyLoaderHandler(state, { ...payload, isLoading })).toEqual({
            ...state,
            bestSales: { ...state[elementName], isLoading }
        });
    });

    it('isLoading of state element should be false', () => {
        const isLoading = false;
        expect(triggerStatePropertyLoaderHandler(state, { ...payload, isLoading })).toEqual({
            ...state,
            bestSales: { ...state[elementName], isLoading }
        });
    });
});
