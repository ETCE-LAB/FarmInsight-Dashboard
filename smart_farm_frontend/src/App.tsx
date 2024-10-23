import React from 'react';



import { Button } from '@mantine/core';

import AreaChartExample from "./example/AreaChartExample";
import {LoginButton} from "./ui/components/loginButton"; // Beispiel für die Nutzung von Mantine Charts

//Login or Logout
const loginButtonDescription = "Login"


const App = () => {
    return (
    <div>
        <LoginButton/>
        <AreaChartExample/>
    </div>

)
}

export default App;
