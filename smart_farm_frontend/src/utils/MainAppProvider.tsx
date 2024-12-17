import React, {PropsWithChildren} from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { store } from './store';
import {WebStorageStateStore} from "oidc-client-ts";
import {AuthProvider} from "react-oidc-context";
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
//import {SocketProvider} from "./SocketProvider";
import '@mantine/carousel/styles.css';

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

export const MOCK_USER = {
    access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlFREE4MDY3Qzk0ODFBRkU4QjY1QjNGQThBMjZCRTY3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2RldmVsb3BtZW50LWlzc2UtaWRlbnRpdHlzZXJ2ZXIuYXp1cmV3ZWJzaXRlcy5uZXQiLCJuYmYiOjE3MzQwODA1NzEsImlhdCI6MTczNDA4MDU3MSwiZXhwIjoxNzM0MDg0MTcxLCJhdWQiOiJodHRwczovL2RldmVsb3BtZW50LWlzc2UtaWRlbnRpdHlzZXJ2ZXIuYXp1cmV3ZWJzaXRlcy5uZXQvcmVzb3VyY2VzIiwic2NvcGUiOlsib3BlbmlkIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoiaW50ZXJhY3RpdmUiLCJzdWIiOiIwOWNmOWM2Zi1mYTU2LTRmYjItYjg1Ni1hYTM1OGYzNmNiNjAiLCJhdXRoX3RpbWUiOjE3MzQwNzgyMzcsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJtYXIucGV0ZXJAb3N0ZmFsaWEuZGUiLCJuYW1lIjoibWFyLnBldGVyQG9zdGZhbGlhLmRlIiwiaWQiOiIwOWNmOWM2Zi1mYTU2LTRmYjItYjg1Ni1hYTM1OGYzNmNiNjAiLCJzaWQiOiIyRjk4QkU4RjI0NkNFOUQ2MTI3MTJBMEU5MkI5MzczNCIsImp0aSI6IjM5RTI3QTk1MzVGNDRCNjk0RDdBRUU2ODc4ODZEMjc2In0.Ai4Ccz4R2krFh8ew2F-Fc9ruNyVOqSi0YbdDUIC6nRnN_YeVvsLjviDC_HfD0-n1mgy91ODSlUxBYW0DFevAwaksk6t2USQZfy9lH8AVdzI2pSpfbUqXIWhi7u9JQ16T6_t7i5QzhARgbrfLtk-4j45uijfqNDnJ1_RmLIkDGhHRjGoXJh9neo7I9lFvioSZ-MP3gYOD8uknQGg-WIliqTsiVBmxy-YsBwq_qKG1qotWzavvH76T1jkEzJAom2GrxYfZViV6SFfq_dYqkUWNXylgP4N34ZdSP8Q_yZk2n-cPgqKy4S3MVQwpiv5Nd0xr88IVE9MBBq6TggptD5xG1w",
    profile: {
        sub: "mock-sub-123456",
        email: "mockuser@example.com",
        name: "Mock User",
        access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlFREE4MDY3Qzk0ODFBRkU4QjY1QjNGQThBMjZCRTY3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2RldmVsb3BtZW50LWlzc2UtaWRlbnRpdHlzZXJ2ZXIuYXp1cmV3ZWJzaXRlcy5uZXQiLCJuYmYiOjE3MzQwODA1NzEsImlhdCI6MTczNDA4MDU3MSwiZXhwIjoxNzM0MDg0MTcxLCJhdWQiOiJodHRwczovL2RldmVsb3BtZW50LWlzc2UtaWRlbnRpdHlzZXJ2ZXIuYXp1cmV3ZWJzaXRlcy5uZXQvcmVzb3VyY2VzIiwic2NvcGUiOlsib3BlbmlkIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoiaW50ZXJhY3RpdmUiLCJzdWIiOiIwOWNmOWM2Zi1mYTU2LTRmYjItYjg1Ni1hYTM1OGYzNmNiNjAiLCJhdXRoX3RpbWUiOjE3MzQwNzgyMzcsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJtYXIucGV0ZXJAb3N0ZmFsaWEuZGUiLCJuYW1lIjoibWFyLnBldGVyQG9zdGZhbGlhLmRlIiwiaWQiOiIwOWNmOWM2Zi1mYTU2LTRmYjItYjg1Ni1hYTM1OGYzNmNiNjAiLCJzaWQiOiIyRjk4QkU4RjI0NkNFOUQ2MTI3MTJBMEU5MkI5MzczNCIsImp0aSI6IjM5RTI3QTk1MzVGNDRCNjk0RDdBRUU2ODc4ODZEMjc2In0.Ai4Ccz4R2krFh8ew2F-Fc9ruNyVOqSi0YbdDUIC6nRnN_YeVvsLjviDC_HfD0-n1mgy91ODSlUxBYW0DFevAwaksk6t2USQZfy9lH8AVdzI2pSpfbUqXIWhi7u9JQ16T6_t7i5QzhARgbrfLtk-4j45uijfqNDnJ1_RmLIkDGhHRjGoXJh9neo7I9lFvioSZ-MP3gYOD8uknQGg-WIliqTsiVBmxy-YsBwq_qKG1qotWzavvH76T1jkEzJAom2GrxYfZViV6SFfq_dYqkUWNXylgP4N34ZdSP8Q_yZk2n-cPgqKy4S3MVQwpiv5Nd0xr88IVE9MBBq6TggptD5xG1w",
        url_state : "",
    },

};

export const mockAuth = {
    isAuthenticated: true,
    user: MOCK_USER.profile,
    accessToken: MOCK_USER.access_token,
    signinRedirect: () => {
        console.log("Mock signinRedirect called. Skipping real redirect.");
    },
    signoutRedirect: () => {
        console.log("Mock signoutRedirect called. Skipping real redirect.");
    },
    isLoading : false,
};

export const useAuth = () => {
        return mockAuth; // Return mock user data and authentication status
};

const MockAuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

    localStorage.setItem(
        `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`,
        JSON.stringify({
            access_token: MOCK_USER.access_token,
            profile: MOCK_USER.profile,
            expires_at: Math.floor(Date.now() / 1000) + 36000,
        })
    );

    console.log("Mock authentication enabled.");

    return <>{children}</>;
};

const MainAppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        //Auth Provider goes here too
        //Redux Provider
        <MockAuthProvider {...oidcConfig}>
            <Provider store={store}>
                {/* <SocketProvider> */}
                <MantineProvider defaultColorScheme="auto">
                    <Notifications position="bottom-right" zIndex={3000} limit={5}/>
                    {children}
                    </MantineProvider>
               {/* </SocketProvider>*/}
            </Provider>
        </MockAuthProvider>
    );
};

export default MainAppProvider;
