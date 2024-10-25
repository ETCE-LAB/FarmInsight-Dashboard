import React from 'react';
import { Button, MantineProvider } from '@mantine/core';
import {LoginButton} from "./ui/components/loginButton";
import Header from './ui/components/Header';

//const loginButtonDescription = "Login"

const App = () => {
    return (
        <MantineProvider>
            <Header/>
        </MantineProvider>

    )
}

export default App;
