import { Text, Group } from '@mantine/core';
import React, {useEffect, useState} from "react";
import {UserProfile} from "../models/UserProfile"
import {useAppSelector} from "../../../utils/Hooks";
import {receivedUserProfileEvent} from "../state/UserProfileSlice";
import {useAuth} from "react-oidc-context";
import APIClient from "../../../utils/APIClient";
import {receiveUserProfile} from "../useCase/receiveUserProfile";
// @ts-ignore
import {IconUserCog} from "@tabler/icons-react";


const UserProfileComponent = () => {
    const auth = useAuth()
    const apiClient = new APIClient()

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const userProfileReceivedEventListener = useAppSelector(receivedUserProfileEvent)


    useEffect(() => {
        if(auth.user != null) {
            receiveUserProfile().then(resp => {
                setUserProfile(resp)
            })
        }
    }, [auth.user, userProfileReceivedEventListener]);

    const editProfile = () => {
        console.log("editing Profile")
    }

    return (
        <>
            {auth.isAuthenticated && userProfile != null && (
                <Group gap="center">
                    <IconUserCog size={25} cursor="pointer"/>
                    <Text
                        variant="filled"
                        style={{
                            backgroundColor: "#199ff4",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            color: "white",
                        }}
                        onClick={editProfile}
                    >
                        {userProfile?.email}
                    </Text>
                </Group>
            )
            }
        </>
    );
}

export {UserProfileComponent}