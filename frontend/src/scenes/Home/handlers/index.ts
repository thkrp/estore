import { HomeState } from '../types/home.state';

export const sectionItemsHandler = <T>(
    state: HomeState,
    { items, section }: { items: T[]; section: keyof HomeState }
) => ({
    ...state,
    [section]: {
        ...state[section],
        items: [...(state[section].items || []), ...items]
    }
});
