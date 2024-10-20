import { createTheme, MantineProvider } from '@mantine/core';
import React from "react";


const MainAppProvider = () => {
    return (
    <MantineProvider defaultColorScheme="dark">
        {/* Main App should be called here*/}
    </MantineProvider>
    )
}

export default MainAppProvider