import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import MainAppProvider from "./utils/MainAppProvider";
import {Router} from "./utils/Router";
import {OrganizationForm} from "./features/organization/ui/organizationForm";
import {FoodProductionFacilityForm} from "./ui/components/fpfForm";
import {createFpf} from "./features/fpf/useCase/createFpf";
import {CreateOrganization} from "./features/organization/ui/CreateOrganization";
import {UserOrganizations} from "./features/organization/ui/myOrganizations";
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

