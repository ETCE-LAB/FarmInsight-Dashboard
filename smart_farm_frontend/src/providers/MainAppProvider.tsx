// src/MainAppProvider.tsx
import React, {PropsWithChildren} from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { store } from '../state/store';  // importiere deinen Redux-Store

const MainAppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        //Auth Provider goes here too
        //Redux Provider
        <Provider store={store}>
            <MantineProvider defaultColorScheme="dark">
                {children}
            </MantineProvider>
        </Provider>
    );
};

export default MainAppProvider;
