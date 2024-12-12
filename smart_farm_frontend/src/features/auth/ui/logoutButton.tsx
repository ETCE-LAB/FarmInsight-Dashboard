import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
    const auth = useAuth();
    const { t } = useTranslation();



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
            (<Button onClick={() => { void auth.signoutRedirect()}} variant="filled" color="red">{t('header.logout')}</Button>)
        }
        </>
    )
}
