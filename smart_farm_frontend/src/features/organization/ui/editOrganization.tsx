import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganization } from "../useCase/getOrganization";
import { Organization } from "../models/Organization";
import {Button, Card, Modal, Notification, Paper, Title, Text} from "@mantine/core";
import { SearchUserProfile } from "../../userProfile/ui/searchUserProfile";
import { UserProfile } from "../../userProfile/models/UserProfile";
import { addUserToOrganization } from "../useCase/addUserToOrganization";
import {IconPlus} from '@tabler/icons-react';
import {FpfForm} from "../../fpf/ui/fpfForm";
import {MembershipList} from "../../membership/ui/MembershipList";
import {useAppDispatch} from "../../../utils/Hooks";
import {changeMembership} from "../../membership/state/MembershipSlice";


export const EditOrganization = () => {
    const { name } = useParams<{ name: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [usersToAdd, setUsersToAdd] = useState<UserProfile[]>([]);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [userModalOpen, setUserModalOpen] = useState(false); // State to manage modal visibility
    const [fpfModalOpen, setFpFModalOpen] = useState(false); // State to manage FpF modal visibility

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (name) {
            getOrganization(name)
                .then((org) => {
                    setOrganization(org)

                })
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
                dispatch(changeMembership())
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
                    <MembershipList members={organization.memberships} />

                    <Button
                        onClick={() => setUserModalOpen(true)} // Open modal on button click
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        <IconPlus size={18} style={{ marginRight: "8px" }} />
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
                    <Button
                        onClick={() => setFpFModalOpen(true)} // Open modal on button click
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        <IconPlus size={18} style={{ marginRight: "8px" }} />
                        Add FPF
                    </Button>
                    {/*Add User */ }
                    <Modal
                        opened={userModalOpen}
                        onClose={() => setUserModalOpen(false)}
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
                    {/*Add FpF */ }
                    <Modal
                        opened={fpfModalOpen}
                        onClose={() => setFpFModalOpen(false)}
                        title="Create FpF"
                        centered
                    >
                        <FpfForm  inputOrganization={organization}></FpfForm>
                    </Modal>

                </>
            ) : null}
        </>
    );
};
