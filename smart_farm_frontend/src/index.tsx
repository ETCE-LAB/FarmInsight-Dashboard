import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css'; //don`t delete ever
import MainAppProvider from "./utils/MainAppProvider";
import {Router} from "./utils/Router";
import {OrganizationForm} from "./features/organization/ui/organizationForm";
import {FoodProductionFacilityForm} from "./features/fpf/ui/fpfForm";
import {createFpf} from "./features/fpf/useCase/createFpf";
import {CreateOrganization} from "./features/organization/ui/CreateOrganization";
import {MyOrganizations} from "./features/organization/ui/myOrganizations";
import TimeseriesGraph from "./features/measurements/ui/timeseriesGraph";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

    <MainAppProvider>
        <Router></Router>
    </MainAppProvider>
);

