import { sectionItemsHandler } from '../../../scenes/Home/handlers';
import { HomeState } from '../../../scenes/Home/types/home.state';

describe('Home handlers', () => {
    it('sectionItemsHandler should update items of section in the Home State', () => {
        const sectionValue = {
            isLoading: false,
            items: []
        };
        const state: HomeState = {
            arrivals: sectionValue,
            discounted: sectionValue,
            brands: sectionValue,
            bestSales: sectionValue
        };
        const updatedState = sectionItemsHandler(state, { items: [1, 2, 3], section: 'arrivals' });
        expect(updatedState).toEqual({
            arrivals: {
                isLoading: false,
                items: [1, 2, 3]
            },
            discounted: sectionValue,
            brands: sectionValue,
            bestSales: sectionValue
        });
        expect(sectionItemsHandler(updatedState, { items: [4, 5, 6], section: 'arrivals' })).toEqual({
            arrivals: {
                isLoading: false,
                items: [1, 2, 3, 4, 5, 6]
            },
            discounted: sectionValue,
            brands: sectionValue,
            bestSales: sectionValue
        });
    });
});
