import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css'; // don’t delete ever
import MainAppProvider from './utils/MainAppProvider';
import { Router } from './utils/Router';
import './index.css';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <I18nextProvider i18n={i18n}>
        <MainAppProvider>
            <Router />
        </MainAppProvider>
    </I18nextProvider>
);
