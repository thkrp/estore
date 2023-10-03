/* eslint-disable no-restricted-imports*/
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockData } from 'app-shared';
import Breadcrumbs from '../../components/Breadcrumbs';

describe('breadcrumbs', () => {
    afterEach(cleanup);

    const {
        catalogMenu,
        products: {
            items: [detailed]
        }
    } = mockData;
    const initialState = {
        app: {
            menu: {
                catalog: catalogMenu
            }
        },
        catalog: {
            detailed
        }
    };
    const path = '/catalog/motoblochnoe-navesnoe-oborudovanie/adaptery-dlya-motoblokov';
    const id = 'adapter-k-motobloku-ara';
    const mockStore = configureStore();
    let store;
    it('should return null if no breadcrumbs exist', () => {
        const initialEntries = ['/test'];
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Breadcrumbs />
                </MemoryRouter>
            </Provider>
        );
        const element = screen.getByLabelText('breadcrumbs');
        expect(element).toBeEmptyDOMElement();
    });

    it('should return breadcrumbs', () => {
        store = mockStore(initialState);
        const initialEntries = [`${path}`];
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Breadcrumbs />
                </MemoryRouter>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });

    it('should return breadcrumbs with loader component', async () => {
        store = mockStore({ ...initialState, catalog: { detailed: { name: undefined, code: '', url: '' } } });
        const initialEntries = [`${path}/${id}`];
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path={`${path}/:id`} element={<Breadcrumbs />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const loader = await screen.findByRole('img');
        expect(loader).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should return breadcrumbs with detailed product', async () => {
        store = mockStore(initialState);
        const initialEntries = [`${path}/${id}`];
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path={`${path}/:id`} element={<Breadcrumbs />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });

    it('clicking on the button should open a menu of subcategories', () => {
        store = mockStore(initialState);
        const initialEntries = [`${path}`];
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>
                        <Route path={path} element={<Breadcrumbs />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByRole('presentation');
        const hiddenListOfSubcategories = screen.queryByRole('menu');
        expect(hiddenListOfSubcategories).toBeNull();
        fireEvent.click(button);
        const listOfSubcategories = screen.getByRole('menu');
        expect(listOfSubcategories).toBeInTheDocument();
        expect(listOfSubcategories).toMatchSnapshot();
    });
});
