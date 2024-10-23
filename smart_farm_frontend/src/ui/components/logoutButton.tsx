import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";


export const LogoutButton = () => {
    const auth = useAuth();
    return (
        <>
        {
            auth.isAuthenticated &&
            (<Button onClick={() => {
                void auth.signoutRedirect()
            }} variant="filled" color="green">Logout</Button>)
        }
        </>
    )
}
