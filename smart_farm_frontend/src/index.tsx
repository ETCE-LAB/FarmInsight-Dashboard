import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css'; //don`t delete ever
import MainAppProvider from "./utils/MainAppProvider";
import {Router} from "./utils/Router";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

    <MainAppProvider>
        <Router></Router>
    </MainAppProvider>
);

