import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Combobox, createTheme, darken, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';


import { Provider} from "react-redux"
import {store} from "./store";
import MainAppProvider from "./MainAppProvider";
import {Router} from "./Router";
import {Header_Tabs} from "./ui/components/Header_Tabs";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

    <MainAppProvider>
        <Router></Router>
    </MainAppProvider>



);

