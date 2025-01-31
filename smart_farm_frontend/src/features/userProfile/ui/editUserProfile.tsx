import { Button, Card, Group, Stack, TextInput, Anchor, Divider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { modifyUserProfile } from "../useCase/modifyUserProfile";
import { UserProfile } from "../models/UserProfile";
import { receiveUserProfile } from "../useCase/receiveUserProfile";
import { useAuth } from "react-oidc-context";
import { useAppDispatch, useAppSelector } from "../../../utils/Hooks";
import { changedUserProfile, receivedUserProfileEvent } from "../state/UserProfileSlice";
import { showNotification } from "@mantine/notifications";
import { useTranslation } from 'react-i18next';
import {IconLockCog} from "@tabler/icons-react";

export const EditUserProfile = () => {
    const [editableProfile, setEditableProfile] = useState({
        email: '',
        name: ''
    });
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const { t } = useTranslation();
    const auth = useAuth();
    const userProfileReceivedEventListener = useAppSelector(receivedUserProfileEvent);
    const dispatch = useAppDispatch();

    const handleInputChange = (field: keyof typeof editableProfile, value: string) => {
        setEditableProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await modifyUserProfile({
                name: editableProfile.name,
            });
            dispatch(changedUserProfile());
            setUserProfile((prev) => (prev ? { ...prev, ...response } : null));
            showNotification({
                title: t("userprofile.notifications.success.title"),
                message: t("userprofile.notifications.success.message"),
                color: 'green',
            });
        } catch (error) {
            showNotification({
                title: t("userprofile.notifications.error.title"),
                message: `${error}`,
                color: 'red',
            });
        }
    };

    useEffect(() => {
        if (auth.user) {
            receiveUserProfile()
                .then((resp) => {
                    if (resp) {
                        setUserProfile(resp);
                        setEditableProfile({
                            email: resp.email || '',
                            name: resp.name || '',
                        });
                    } else {
                        console.warn('No user profile data received');
                        setUserProfile(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [auth.user, userProfileReceivedEventListener]);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
                <TextInput
                    label={t("header.email")}
                    value={editableProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                />
                <TextInput
                    label={t("header.name")}
                    placeholder={t("userprofile.enterName")}
                    value={editableProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <Group mt="md">
                    <Button onClick={handleSave} color="blue">
                        {t("userprofile.saveChanges")}
                    </Button>
                </Group>
                <Divider />
                <Group mt="md">
                    <Button
                        component="a"
                        href={`${process.env.REACT_APP_BACKEND_URL}/api/change-password`}
                        target="_blank"
                        variant="light"
                        leftSection={<IconLockCog/>}
                    >
                        {t("userprofile.changePassword")}
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
};
