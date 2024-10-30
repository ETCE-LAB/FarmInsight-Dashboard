import { HoverCard, Button, Text, Group } from '@mantine/core';
import {useEffect, useState} from "react";
import {UserProfile} from "../models/UserProfile"
import {useAppSelector} from "../../../Hooks";
import {receivedUserProfileEvent} from "../state/UserProfileState";
import {useAuth} from "react-oidc-context";
import APIClient from "../../../utils/APIClient";
import {receiveUserProfile} from "../useCase/receiveUserProfile";



const UserProfileComponent = () => {
    const auth = useAuth()
    const apiClient = new APIClient()

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const userProfileReceivedEventListener = useAppSelector(receivedUserProfileEvent)


    useEffect(() => {

        //React does not allow to await the promised return from receiveUSerProfile
        //Instead I HAVE to creat a function where i await the return und than set the received UserProfile
        const fetchUserProfile = async () => {
        const userProfile = await receiveUserProfile()
        setUserProfile(userProfile)
        }
        if(auth.user != null) {
            fetchUserProfile()
        }

    }, [auth.user, userProfileReceivedEventListener]);

    const editProfile = () => {
        console.log("editing Profile")
    }

    return (
        <Group justify="center">
            <HoverCard width={280} shadow="md">
                <HoverCard.Target>
                    <Button variant="filled" color="green" onClick={() => editProfile()}>E-Mail: {userProfile?.email}</Button >
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="sm">
                        E-Mail: {userProfile?.email}
                    </Text>
                </HoverCard.Dropdown>

            </HoverCard>
        </Group>
    );
}

export {UserProfileComponent}
