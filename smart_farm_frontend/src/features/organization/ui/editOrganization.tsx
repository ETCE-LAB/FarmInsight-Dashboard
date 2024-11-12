import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganization } from "../useCase/getOrganization";
import { Organization } from "../models/Organization";
import { Button, Modal, TextInput } from "@mantine/core";
import {SearchUserProfile} from "../../userProfile/ui/searchUserProfile";
import {UserProfile} from "../../userProfile/models/UserProfile";


export const EditOrganization = () => {
    const { name } = useParams<{ name: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const [usersToAdd, setUsersToAdd] = useState<UserProfile[]>([])
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
        if (usersToAdd.includes(user))
            return
        let tempUserList = usersToAdd.slice()
    }
    return (
        <>
            {organization ? (
                <>
                    <div>
                        <h1>{organization.name}</h1>
                        <p>{organization.isPublic ? "Public" : "Private"}</p>
                    </div>
                    <Button
                        onClick={() => setModalOpen(true)} // Open modal on button click
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        Add User
                    </Button>
                    {/* Modal component */}
                    <Modal
                        opened={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Add User to Organization"
                        centered
                    >
                        <SearchUserProfile onUserSelected = {userSelected} />
                    </Modal>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
