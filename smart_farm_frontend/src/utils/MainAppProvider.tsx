// src/MainAppProvider.tsx
import React, {PropsWithChildren} from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { store } from './store';  // importiere deinen Redux-Store
import {WebStorageStateStore} from "oidc-client-ts";
import {AuthProvider} from "react-oidc-context";

export const oidcConfig = {
    authority: "https://development-isse-identityserver.azurewebsites.net",
    client_id: "interactive",
    redirect_uri: window.location.origin + "/auth/callback",
    post_logout_redirect_uri: window.location.origin + "/auth/signout-callback",
    scopes: "profile openId offline_access",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true
// ...
};

const MainAppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        //Auth Provider goes here too
        //Redux Provider
        <AuthProvider {...oidcConfig}>
            <Provider store={store}>
                <MantineProvider defaultColorScheme="auto">
                    {children}
                </MantineProvider>
            </Provider>
        </AuthProvider>
    );
};

export default MainAppProvider;
