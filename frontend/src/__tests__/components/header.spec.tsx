/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Locale, Localization, mockData } from 'app-shared';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Header } from '../../components';

describe('header', () => {
    const menu = mockData.topMenu;
    const info = mockData.generalInformation;
    const mockStore = configureStore();
    let store;
    const initialState = {
        cart: {
            items: []
        }
    };
    it('should not be empty', () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <IntlProvider key={Localization.ru} locale={Locale.ru} messages={mockData.localizationData}>
                    <Header menu={menu} info={info} />
                </IntlProvider>
            </Provider>,
            { wrapper: MemoryRouter }
        );
        expect(container).not.toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
});
