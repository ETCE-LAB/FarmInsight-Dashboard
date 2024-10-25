import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";

export const LogoutButton = () => {
    const auth = useAuth();


    async function fetchData() {
        try {
            const token = auth.user?.access_token;
            const response = await fetch(`http://127.0.0.1:8000/api/userprofiles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.dir(response)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
        {
            auth.isAuthenticated &&
            (<>
                <Button onClick={() => {
                void auth.signoutRedirect()
            }} variant="filled" color="green">Logout</Button>
            <Button onClick={fetchData} variant="filled" color="green">getUserprofile</Button>
                </>
            )
        }
        </>
    )
}
