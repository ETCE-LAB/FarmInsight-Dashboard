import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";
import {ReceiveUserProfile} from "../../features/userProfile/usaCase/ReceiveUserProfile";


export const LoginButton = () => {
    const auth = useAuth();

    const onClick = () => {
        void auth.signinRedirect()
    }



    return (
        <>
        {
            !auth.isAuthenticated &&
            (<Button onClick={() => onClick() } variant="filled" color="green">Login</Button>)
        }
        </>
    )
}
