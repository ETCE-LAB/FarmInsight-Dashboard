import {promoteMember} from "../useState/promoteMember";
import {Button, Notification} from "@mantine/core";
import React, {useState} from "react";
import {kickMember} from "../useState/kickMember";
import {useDispatch} from "react-redux";
import {changedMembership} from "../state/MembershipSlice";


export const KickMemberButton:React.FC<{id:string}> = ({id}) => {
    const dispatch = useDispatch();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    function handleKick(id: string) {
        kickMember({id}).then(r =>{
            setNotification({
                type: 'success',
                message: `User was kicked from Organization.`,
            })
            dispatch(changedMembership());
        })
    }

    return (
        <Button onClick={() => handleKick(id)} variant="outline" size="xs" color="red">
            Kick
        </Button>
    )

}