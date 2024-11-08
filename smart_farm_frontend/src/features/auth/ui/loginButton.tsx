import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";


export const LoginButton = () => {
    const auth = useAuth();

    const onClick = () => {
        void auth.signinRedirect()
    }

    return (
        <>
        {
            !auth.isAuthenticated &&
            (<Button onClick={() => onClick() } variant="filled" color= '#03A9F4' >Login</Button>)
        }
        </>
    )
}
