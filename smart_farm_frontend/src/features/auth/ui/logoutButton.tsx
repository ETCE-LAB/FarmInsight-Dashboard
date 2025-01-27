import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "react-oidc-context";
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
        {
            auth.isAuthenticated &&
            (<Button onClick={() => { void auth.removeUser(); window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/logout` }} variant="filled" color="red">{t('header.logout')}</Button>)
        }
        </>
    )
}
