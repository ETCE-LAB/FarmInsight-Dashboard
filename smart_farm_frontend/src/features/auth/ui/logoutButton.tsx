import React from 'react';
import {Button} from "@mantine/core";
import {useAuth} from "../../../utils/MainAppProvider"//"react-oidc-context";
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
        {
            auth.isAuthenticated &&
            (<Button onClick={() => { void auth.signoutRedirect()}} variant="filled" color="red">{t('header.logout')}</Button>)
        }
        </>
    )
}
