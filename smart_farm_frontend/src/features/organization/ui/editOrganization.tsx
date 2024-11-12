import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganization } from "../useCase/getOrganization";
import { Organization } from "../models/Organization";
import {Button, Card, Modal, Notification, Paper, Title, Text} from "@mantine/core";
import { SearchUserProfile } from "../../userProfile/ui/searchUserProfile";
import { UserProfile } from "../../userProfile/models/UserProfile";
import { addUserToOrganization } from "../useCase/addUserToOrganization";
import {IconUsersPlus} from "@tabler/icons-react";

export const EditOrganization = () => {
    const { name } = useParams<{ name: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [usersToAdd, setUsersToAdd] = useState<UserProfile[]>([]);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        if (name) {
            getOrganization(name)
                .then((org) => setOrganization(org))
                .catch((error) => {
                    console.error("Failed to fetch organization:", error);
                });
        }
    }, [name]);

    const userSelected = (user: UserProfile) => {
        if (!usersToAdd.includes(user)) {
            setUsersToAdd((prevUsers) => [...prevUsers, user]);
        }
    };

    const handleAddUsers = () => {
        // Add users to organization
        Promise.all(
            usersToAdd.map((user) =>
                addUserToOrganization({
                    organizationId: organization?.id || '',
                    userprofileId: user.id,
                    membershipRole: "member",
                })
            )
        )
            .then(() => {
                // Show success notification
                setNotification({
                    type: 'success',
                    message: `${usersToAdd.length} users have been added to the organization.`,
                });
                // Clear the user list
                setUsersToAdd([]);
            })
            .catch((error) => {
                // Show error notification
                setNotification({
                    type: 'error',
                    message: 'There was an error adding the users.',
                });
                console.error("Error adding users:", error);
            });
    };

    return (
        <>
            {organization ? (
                <>
                    <Paper
                        radius="md"
                        p="xs"
                        style={{
                            border: "1px solid #105385",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Title order={2} style={{ color: "#105385", marginBottom: "10px" }}>
                            Organization: {organization.name}
                        </Title>
                        <Text
                            size="sm"
                            style={{
                                color: organization.isPublic ? "#28a745" : "#dc3545",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                backgroundColor: organization.isPublic ? "#e6f9f0" : "#fbe5e5",
                                display: "inline-block",
                            }}
                        >
                            {organization.isPublic ? "Public" : "Private"}
                        </Text>
                    </Paper>
                    <Button
                        onClick={() => setModalOpen(true)}
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        <IconUsersPlus size={18} style={{ marginRight: "8px" }} />
                        Add Users
                    </Button>
                    <Card>
                        {usersToAdd.length > 0 ? (
                            usersToAdd.map((user, index) => (
                                <div key={index}>
                                    <p>{user.name || user.email}</p>
                                </div>
                            ))
                        ) : (
                            <p
                                style={{
                                    justifySelf: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                No users to add
                            </p>
                        )}
                        {usersToAdd.length > 0 && (
                            <Button
                                onClick={handleAddUsers}
                                style={{
                                    marginTop: "10px",
                                }}
                            >
                                Add Users
                            </Button>
                        )}
                    </Card>
                    <Modal
                        opened={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Add User to Organization"
                        centered
                    >
                        <SearchUserProfile onUserSelected={userSelected} />
                    </Modal>

                    {/* Notification component */}
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
                            }}
                        >
                            {notification.message}
                        </Notification>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
