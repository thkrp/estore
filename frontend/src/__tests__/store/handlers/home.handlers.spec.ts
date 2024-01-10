import { sectionItemsHandler } from '../../../scenes/Home/handlers';
import { HomeState } from '../../../scenes/Home/types/home.state';

describe('Home handlers', () => {
    it('sectionItemsHandler should update items of section in the Home State', () => {
        const sectionValue = {
            isLoading: false,
            items: [],
            total_count: 0,
            page: 1,
            pageSize: NaN
        };
        const state: HomeState = {
            arrivals: sectionValue,
            discounted: sectionValue,
            brands: sectionValue,
            bestSales: sectionValue
        };
        const updatedState = sectionItemsHandler(state, {
            items: [1, 2, 3],
            section: 'arrivals',
            total_count: 11,
            page: 1,
            pageSize: NaN
        });
        expect(updatedState).toEqual({
            arrivals: {
                isLoading: false,
                items: [1, 2, 3],
                total_count: 11,
                page: 1,
                pageSize: NaN
            },
            discounted: sectionValue,
            brands: sectionValue,
            bestSales: sectionValue
        });
        expect(
            sectionItemsHandler(updatedState, {
                items: [4, 5, 6],
                section: 'arrivals',
                total_count: 11,
                page: 2,
                pageSize: NaN
            })
        ).toEqual({
            arrivals: {
                isLoading: false,
                items: [1, 2, 3, 4, 5, 6],
                page: 2,
                total_count: 11,
                pageSize: NaN
            },
            discounted: sectionValue,
            brands: sectionValue,
            bestSales: sectionValue
        });
    });
});
