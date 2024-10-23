import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";


export const LoginButton = () => {
    const auth = useAuth();
    return (
        <>
        {
            !auth.isAuthenticated &&
            ( <Button onClick={() => void auth.signinRedirect()} variant="filled" color="green">Login</Button>
            )
        }
        </>
    )
}
