import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { Provider} from "react-redux"
import {store} from "./store";
import MainAppProvider from "./MainAppProvider";
import {Router} from "./Router";
import {OrganizationForm} from "./ui/components/organizationForm";
import {FoodProductionFacilityForm} from "./ui/components/fpfForm";

import {createFpf} from "./features/fpf/useCase/createFpf";
import {Header_Tabs} from "./ui/components/Header_Tabs";
import {CreateOrganization} from "./features/organization/ui/components/CreateOrganization";
import {UserOrganizations} from "./ui/components/myOrganizations";
import {TimeseriesGraph} from "./features/fpf/ui/components/timeseriesGraph";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

    <MainAppProvider>
        <Router></Router>
        <OrganizationForm onSave={async (data) => {
            console.log("saving", data);
            await CreateOrganization()
        }} />
        <FoodProductionFacilityForm organization={"test123"} onSave={async (data) => {
            console.log("saving", data)
            await createFpf(data)
        }} />
        <UserOrganizations />
        <TimeseriesGraph />
    </MainAppProvider>



);

