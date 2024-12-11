import {useLocation, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganization } from "../useCase/getOrganization";
import { Organization } from "../models/Organization";
import {Button, Card, Modal, TextInput, Switch, Flex, Title, Text, Box} from "@mantine/core";
import { SearchUserProfile } from "../../userProfile/ui/searchUserProfile";
import { UserProfile } from "../../userProfile/models/UserProfile";
import { addUserToOrganization } from "../useCase/addUserToOrganization";
import {IconPlus} from '@tabler/icons-react';
import {FpfForm} from "../../fpf/ui/fpfForm";
import {MembershipList} from "../../membership/ui/MembershipList";
import {useAppDispatch} from "../../../utils/Hooks";
import {changedMembership} from "../../membership/state/MembershipSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";
import { useTranslation } from 'react-i18next';
import {showNotification} from "@mantine/notifications";

export const EditOrganization = () => {
    const { organizationId } = useParams();
    const { t } = useTranslation();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [usersToAdd, setUsersToAdd] = useState<UserProfile[]>([]);
    const [userModalOpen, setUserModalOpen] = useState(false); // State to manage modal visibility
    const [fpfModalOpen, setFpFModalOpen] = useState(false); // State to manage FpF modal visibility
    const membershipEventListener = useSelector((state: RootState) => state.membership.changeMembershipEvent);

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (organizationId)
            getOrganization(organizationId)
                .then((org) => setOrganization(org))
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
                    message: `${usersToAdd.length} users have been added to the organization.`,
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

    return (
        <>
            {organization ? (
                <>
                    <Title order={2} style={{ marginBottom: "10px" }}>
                        {t("header.organization")}: {organization.name}
                    </Title>
                    <Text style={{ fontWeight: 'bold' }}>
                        Name
                    </Text>
                    <Flex gap={20} align="center" mb="2rem">
                        <TextInput placeholder={organization.name} ></TextInput>
                        <Switch
                            label="Is Public"
                            checked={organization.isPublic}
                        />
                    </Flex>
                    <Flex gap={20} align="center">
                        <Text style={{ fontWeight: 'bold' }}>
                            Members
                        </Text>
                        <Button
                            onClick={() => setUserModalOpen(true)} // Open modal on button click
                            variant="outline"
                            color="#105385"
                            style={{ margin: '10px' }}

                        >
                            <IconPlus size={18} style={{ marginRight: "8px" }} />
                            Add Users
                        </Button>
                    </Flex>
                    <MembershipList members={organization.memberships} />

                    <Button
                        onClick={() => setUserModalOpen(true)} // Open modal on button click
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        <IconPlus size={18} style={{ marginRight: "8px" }} />
                        {t("header.addUser")}
                    </Button>
                    <Button
                        onClick={() => setFpFModalOpen(true)} // Open modal on button click
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
                        {/* Search and select users */}
                        <SearchUserProfile onUserSelected={userSelected} />

                        {/* Display selected users */}
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

                </>
            ) : null}
        </>
    );
};
