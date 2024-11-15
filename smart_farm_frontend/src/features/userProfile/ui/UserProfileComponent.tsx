import {
    Modal,
    Button,
    Text,
    Group,
    TextInput,
    Select,
    Notification,
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

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableProfile, setEditableProfile] = useState({
        email: '',
        name: '',
        role: '',
    });
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const userProfileReceivedEventListener = useAppSelector(receivedUserProfileEvent);

    useEffect(() => {
        if (auth.user) {
            receiveUserProfile()
                .then((resp) => {
                    if (resp) {
                        setUserProfile(resp);
                        setEditableProfile({
                            email: resp.email || '',
                            name: resp.name || '',
                            role: resp.systemRole || '',
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
            setUserProfile((prev) => (prev ? { ...prev, ...response } : null)); // Update local state
            setIsModalOpen(false); // Close modal after saving

            // Show success notification
            setNotification({
                type: 'success',
                message: 'Your profile has been updated successfully!',
            });

            // Auto-close notification after 3 seconds
            setTimeout(() => {
                setNotification(null);
            }, 3000);

        } catch (error) {
            console.error('Error updating profile:', error);
            setIsModalOpen(false);

            // Show error notification
            setNotification({
                type: 'error',
                message: 'There was an error updating your profile.',
            });

            // Auto-close notification after 3 seconds
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const handleInputChange = (field: keyof typeof editableProfile, value: string) => {
        setEditableProfile((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {auth.isAuthenticated && userProfile && (
                <Group gap="center">
                    <IconUserCog
                        size={30}
                        cursor="pointer"
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
                        {userProfile.email}
                    </Text>
                </Group>
            )}

            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Edit your Profile"
                centered
                style={{
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }}
                styles={{
                    title: {
                        fontSize: '1.5rem'
                    }
                }}
            >
                <TextInput
                    label="Email"
                    value={editableProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                    style={{
                        marginBottom: '16px',
                    }}
                />
                <TextInput
                    label="Name"
                    placeholder="Enter your display name"
                    value={editableProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{
                        marginBottom: '16px',
                    }}
                />
                <Select
                    label="Role"
                    data={[
                        { value: 'user', label: 'User' },
                        { value: 'sysAdmin', label: 'SysAdmin' },
                    ]}
                    value={editableProfile.role}
                    onChange={(value) => handleInputChange('role', value || '')}
                    style={{
                        marginBottom: '16px',
                    }}
                />
                <Group gap="right" mt="md">
                    <Button
                        onClick={handleSave}
                        style={{
                            backgroundColor: '#199ff4',
                            color: 'white',
                            borderRadius: '6px',
                        }}
                    >
                        Save changes
                    </Button>
                </Group>
            </Modal>

            {/* Notification */}
            {notification && (
                <Notification
                    color={notification.type === 'success' ? 'green' : 'red'}
                    title={notification.type === 'success' ? 'Success' : 'Error'}
                    onClose={() => setNotification(null)}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        borderRadius: '8px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {notification.message}
                </Notification>
            )}
        </>
    );
};

export { UserProfileComponent };
