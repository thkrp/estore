import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { mockData } from 'app-shared';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumbs as BreadcrumbsComponent } from '../../../components';

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
const meta = {
    title: 'Components/Breadcrumbs',
    component: BreadcrumbsComponent,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof BreadcrumbsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Categories: Story = {
    decorators: [
        Story => {
            store = mockStore(initialState);
            return (
                <MemoryRouter initialEntries={[`${path}`]}>
                    <Provider store={store}>{Story()}</Provider>
                </MemoryRouter>
            );
        }
    ]
};

export const ProductIsLoading: Story = {
    decorators: [
        Story => {
            store = mockStore({ ...initialState, catalog: { detailed: { name: undefined, code: '', url: '' } } });
            return (
                <MemoryRouter initialEntries={[`${path}/${id}`]}>
                    <Provider store={store}>
                        <Routes>
                            <Route path={`${path}/:id`} element={Story()} />
                        </Routes>
                    </Provider>
                </MemoryRouter>
            );
        }
    ]
};

export const ProductLoaded: Story = {
    decorators: [
        Story => {
            store = mockStore({
                ...initialState,
                catalog: { detailed: { name: 'Адаптер к мотоблоку "АРА"', code: id, url: path } }
            });
            return (
                <MemoryRouter initialEntries={[`${path}/${id}`]}>
                    <Provider store={store}>
                        <Routes>
                            <Route path={`${path}/:id`} element={Story()} />
                        </Routes>
                    </Provider>
                </MemoryRouter>
            );
        }
    ]
};
