import React from 'react';
import { Button, MantineProvider } from '@mantine/core';
import { LoginButton } from "./ui/components/loginButton";
import Header from './ui/components/Header';
import { OrganizationForm } from "./ui/components/organizationForm";

const App = () => {
    return (
        <MantineProvider>
            <Header/>
            <OrganizationForm onSave={(data) => { console.log("saving", data); }} />
        </MantineProvider>
    );
}

export default App;
