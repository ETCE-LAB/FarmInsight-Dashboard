import {
    Modal,
    Button,
    Text,
    Group,
    TextInput
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { UserProfile } from '../models/UserProfile';
import { useAppSelector } from '../../../utils/Hooks';
import { receivedUserProfileEvent } from '../state/UserProfileSlice';
import { useAuth } from 'react-oidc-context';
import APIClient from '../../../utils/APIClient';
import { receiveUserProfile } from '../useCase/receiveUserProfile';
import { modifyUserProfile } from '../useCase/modifyUserProfile';
import { IconUserCog } from '@tabler/icons-react';

const UserProfileComponent = () => {
    const auth = useAuth();
    const apiClient = new APIClient();

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableProfile, setEditableProfile] = useState({
        email: '',
        name: '',
        role: '',
    });
    const userProfileReceivedEventListener = useAppSelector(receivedUserProfileEvent);

    useEffect(() => {
        if (auth.user != null) {
            receiveUserProfile().then((resp) => {
                setUserProfile(resp);
                setEditableProfile({
                    email: resp.email,
                    name: resp.name || '',
                    role: resp.systemRole || '',
                });
            });
        }
    }, [auth.user, userProfileReceivedEventListener]);

    const editProfile = () => {
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        console.log('Saving updated profile:', editableProfile);
        try {
            const response = await modifyUserProfile({
                name: editableProfile.name,
                role: editableProfile.role,
            });
            console.log('Profile updated:', response);
            setUserProfile((prev) => prev ? { ...prev, ...response } : null); // Update the local state
            setIsModalOpen(false); // Close the modal after saving
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error, e.g., show a notification or alert
        }
    };

    const handleInputChange = (field: keyof typeof editableProfile, value: string) => {
        setEditableProfile((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {auth.isAuthenticated && userProfile != null && (
                <Group gap="center">
                    <IconUserCog
                        size={25} cursor="pointer"
                        onClick={editProfile}
                    />
                    <Text
                        variant="filled"
                        style={{
                            backgroundColor: '#199ff4',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            color: 'white',
                        }}
                    >
                        {userProfile?.email}
                    </Text>
                </Group>
            )}

            {/* Modal for Editing Profile */}
            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Edit Profile"
                centered
            >
                <TextInput
                    label="Email"
                    value={editableProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                />
                <TextInput
                    label="Name"
                    value={editableProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <TextInput
                    label="Role"
                    value={editableProfile.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                />
                <Group gap="right" mt="md">
                    <Button onClick={handleSave}>Save</Button>
                </Group>
            </Modal>
        </>
    );
};

export { UserProfileComponent };
