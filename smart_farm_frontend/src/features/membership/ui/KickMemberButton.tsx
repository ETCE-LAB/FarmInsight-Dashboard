import {promoteMember} from "../useState/promoteMember";
import {Button, Notification} from "@mantine/core";
import React, {useState} from "react";
import {kickMember} from "../useState/kickMember";
import {useDispatch} from "react-redux";
import {changedMembership} from "../state/MembershipSlice";
import { useTranslation } from 'react-i18next';

import {showNotification} from "@mantine/notifications";


export const KickMemberButton:React.FC<{id:string}> = ({id}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    function handleKick(id: string) {
        kickMember({id}).then(r =>{
            showNotification({
                    title: 'Success',
                    message: `User was kicked from Organization.`,
                    color: 'green',
                });
            dispatch(changedMembership());
        })
    }

    return (
        <Button onClick={() => handleKick(id)} variant="outline" size="xs" color="red">
            {t("header.kick")}
        </Button>
    )

}