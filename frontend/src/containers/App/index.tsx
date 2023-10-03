import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from '../../store';
import Routing from '../Routing';
import ErrorBoundary from '../ErrorBoundary';
import LocalizationProvider from '../Localization';

const App = () => (
    <HelmetProvider>
        <Provider store={store}>
            <LocalizationProvider>
                <ErrorBoundary fallback="Something went wrong">
                    <Routing />
                </ErrorBoundary>
            </LocalizationProvider>
        </Provider>
    </HelmetProvider>
);

export default App;
