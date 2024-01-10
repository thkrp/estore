import { HomeState, ProductsOfSection } from '../types/home.state';

const isProductsOfSection = (element: HomeState[keyof HomeState]): element is ProductsOfSection => {
    return 'page' in element;
};

export const sectionItemsHandler = <T>(
    state: HomeState,
    {
        items,
        section,
        total_count,
        page,
        pageSize
    }: { items: T[]; section: keyof HomeState; total_count: number; page: number; pageSize: number }
) => {
    const element = state[section];

    return {
        ...state,
        [section]: {
            ...state[section],
            items: [...(state[section].items || []), ...items],
            total_count,
            ...(isProductsOfSection(element) ? { page: page || element.page, pageSize } : {})
        }
    };
};
