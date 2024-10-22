import React from 'react';

import AuthButton from './ui/components/authButton'

import { Button } from '@mantine/core';

import AreaChartExample from "./example/AreaChartExample"; // Beispiel für die Nutzung von Mantine Charts

//Login or Logout
const loginButtonDescription = "Login"


const App = () => {
    return (
    <div>
        <AuthButton/>
        <AreaChartExample/>
    </div>

)
}

export default App;
