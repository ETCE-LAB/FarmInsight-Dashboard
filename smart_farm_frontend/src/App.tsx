import React from 'react';
import { Button, MantineProvider } from '@mantine/core';
import {LoginButton} from "./ui/components/loginButton";
import {Header_Tabs} from "./ui/components/Header_Tabs";

//const loginButtonDescription = "Login"

const App = () => {
    return (
        <MantineProvider>
            <Header_Tabs/>
        </MantineProvider>
    )
}

export default App;
