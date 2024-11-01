import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Combobox, createTheme, darken, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';


import { Provider} from "react-redux"
import {store} from "./store";
import MainAppProvider from "./MainAppProvider";
import {Router} from "./Router";
import Header from './ui/components/Header';
import {OrganizationForm} from "./ui/components/organizationForm";
import {FoodProductionFacilityForm} from "./ui/components/fpfForm";
import {createOrganization} from "./features/organization/useCase/createOrganization";
import {createFpf} from "./features/fpf/useCase/createFpf";
import {Header_Tabs} from "./ui/components/Header_Tabs";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

    <MainAppProvider>
        <Header/>
        <OrganizationForm onSave={async (data) => {
            console.log("saving", data);
            await createOrganization(data)
        }} />
        <FoodProductionFacilityForm organization={"test123"} onSave={async (data) => {
            console.log("saving", data)
            await createFpf(data)
        }} />
        <Router></Router>
    </MainAppProvider>



);

