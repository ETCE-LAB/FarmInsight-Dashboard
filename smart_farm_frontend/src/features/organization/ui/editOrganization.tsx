import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganization } from "../useCase/getOrganization";
import { Organization } from "../models/Organization";
import { Button, Card, Modal, TextInput, Switch, Flex, Title, Text, Box } from "@mantine/core";
import { SearchUserProfile } from "../../userProfile/ui/searchUserProfile";
import { UserProfile } from "../../userProfile/models/UserProfile";
import { addUserToOrganization } from "../useCase/addUserToOrganization";
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { FpfForm } from "../../fpf/ui/fpfForm";
import { MembershipList } from "../../membership/ui/MembershipList";
import { useAppDispatch } from "../../../utils/Hooks";
import { changedMembership } from "../../membership/state/MembershipSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { useTranslation } from 'react-i18next';
import { showNotification } from "@mantine/notifications";
import { editOrganization } from "../useCase/editOrganization"; // Add the import for the use case

export const EditOrganization = () => {
    const { organizationId } = useParams();
    const { t } = useTranslation();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [usersToAdd, setUsersToAdd] = useState<UserProfile[]>([]);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [fpfModalOpen, setFpFModalOpen] = useState(false);
    const [newOrganizationName, setNewOrganizationName] = useState<string>(organization?.name || "");
    const [isPublic, setIsPublic] = useState<boolean>(organization?.isPublic || false);
    const [isModified, setIsModified] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState(false);  // State to control the edit modal visibility
    const membershipEventListener = useSelector((state: RootState) => state.membership.changeMembershipEvent);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (organizationId)
            getOrganization(organizationId)
                .then((org) => {
                    setOrganization(org);
                    setNewOrganizationName(org.name);
                    setIsPublic(org.isPublic);
                    setIsModified(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch organization:", error);
                });
    }, [organizationId, membershipEventListener]);

    const userSelected = (user: UserProfile) => {
        if (!usersToAdd.includes(user)) {
            setUsersToAdd((prevUsers) => [...prevUsers, user]);
        }
    };

    const handleAddUsers = () => {
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
                showNotification({
                    title: 'Success',
                    message: `${usersToAdd.length} ${t("header.userAdded")}`,
                    color: 'green',
                });
                // Clear the user list
                setUsersToAdd([]);
                dispatch(changedMembership());
                setUserModalOpen(false);
            })
            .catch((error) => {
                showNotification({
                    title: 'There was an error adding the users.',
                    message: `${error}`,
                    color: 'red',
                });
                console.error("Error adding users:", error);
            });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewOrganizationName(e.target.value);
        setIsModified(e.target.value !== organization?.name);
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.target.checked);
        setIsModified(e.target.checked !== organization?.isPublic);
    };

    const handleUpdateOrganization = () => {
        if (!organizationId) return;

        if (!organization?.id) {
            throw new Error("Organization ID is undefined");
        }

        const updatedOrganization = {
            ...organization,
            name: newOrganizationName,
            isPublic: isPublic,
        };

        editOrganization(updatedOrganization)
            .then(() => {
                showNotification({
                    title: 'Success',
                    message: `${t("header.organizationUpdated")}`,
                    color: 'green',
                });
                setOrganization(updatedOrganization);
                setIsModified(false);
                setEditModalOpen(false);  // Close modal after saving
            })
            .catch((error) => {
                showNotification({
                    title: 'Error updating organization',
                    message: `${error}`,
                    color: 'red',
                });
                console.error("Error updating organization:", error);
            });
    };

    return (
        <>
            {organization ? (
                <>
                    <Flex align="center" style={{ marginBottom: "10px" }}>
                        <Title order={2} style={{ display: 'inline-block' }}>
                            {t("header.organization")}: {organization.name}
                        </Title>
                        {/* Remove the condition isModified and always show the edit icon */}
                        <IconEdit
                            size={24}
                            onClick={() => setEditModalOpen(true)}  // Open the modal when clicked
                            style={{
                                cursor: 'pointer',
                                color: '#105385',
                                marginLeft: 5,
                            }}
                        />
                    </Flex>
                    <Flex gap={20} align="center">
                        <Text style={{ fontWeight: 'bold' }}>
                            {t("header.members")}
                        </Text>
                        <Button
                            onClick={() => setUserModalOpen(true)}
                            variant="outline"
                            color="#105385"
                            style={{ margin: '10px' }}
                        >
                            <IconPlus size={18} style={{ marginRight: "8px" }} />
                            {t("header.addUser")}
                        </Button>
                    </Flex>
                    <MembershipList members={organization.memberships} />

                    <Button
                        onClick={() => setFpFModalOpen(true)}
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        <IconPlus size={18} style={{ marginRight: "8px" }} />
                        {t("header.addFpf")}
                    </Button>

                    {/* Add User Modal */}
                    <Modal
                        opened={userModalOpen}
                        onClose={() => setUserModalOpen(false)}
                        title={t("header.addUser")}
                        centered
                    >
                        <SearchUserProfile onUserSelected={userSelected} />
                        <Card withBorder style={{ marginTop: '20px' }}>
                            {usersToAdd.length > 0 ? (
                                usersToAdd.map((user, index) => (
                                    <Box key={index} style={{ padding: '5px 0' }}>
                                        <Text>{user.name || user.email}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Text>
                                    {t("header.noUserSelected")}
                                </Text>
                            )}
                            {usersToAdd.length > 0 && (
                                <Button
                                    onClick={handleAddUsers}
                                    fullWidth
                                    style={{ marginTop: '15px' }}
                                    variant="filled"
                                >
                                    {t("header.addSelectedUser")}
                                </Button>
                            )}
                        </Card>
                    </Modal>

                    {/* Add FpF Modal */}
                    <Modal
                        opened={fpfModalOpen}
                        onClose={() => setFpFModalOpen(false)}
                        title={t("header.addFpf")}
                        centered
                    >
                        <FpfForm inputOrganization={organization}></FpfForm>
                    </Modal>

                    {/* Edit Organization Modal */}
                    <Modal
                        opened={editModalOpen}
                        onClose={() => setEditModalOpen(false)}  // Close modal on cancel
                        title={t("header.organization") + ": " + organization.name}
                    centered
                    >
                        <TextInput
                            label={t("header.table.name")}
                            placeholder={organization.name}
                            value={newOrganizationName}
                            onChange={handleNameChange}
                        />
                        <Switch
                            label={t("header.public")}
                            style={{ marginTop: '20px' }}
                            checked={isPublic}
                            onChange={handleSwitchChange}
                        />
                        <Button
                            onClick={handleUpdateOrganization}
                            fullWidth
                            style={{ marginTop: '20px' }}
                            variant="filled"
                        >
                            {t("growingCycleForm.saveButton")}
                        </Button>
                    </Modal>
                </>
            ) : null}
        </>
    );
};
