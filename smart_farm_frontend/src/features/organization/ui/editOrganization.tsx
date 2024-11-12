import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganization } from "../useCase/getOrganization";
import { Organization } from "../models/Organization";
import { Button, Modal, TextInput } from "@mantine/core";
import {SearchUserProfile} from "../../userProfile/ui/searchUserProfile";
import {UserProfile} from "../../userProfile/models/UserProfile";
import {FpfForm} from "../../fpf/ui/fpfForm";


export const EditOrganization = () => {
    const { name } = useParams<{ name: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [userModalOpen, setUserModalOpen] = useState(false); // State to manage modal visibility
    const [fpfModalOpen, setFpFModalOpen] = useState(false); // State to manage FpF modal visibility
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
                        onClick={() => setUserModalOpen(true)} // Open modal on button click
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        Add User
                    </Button>
                    <Button
                        onClick={() => setFpFModalOpen(true)} // Open modal on button click
                        variant="filled"
                        color="#105385"
                        style={{ margin: '10px' }}
                    >
                        Add FPF
                    </Button>
                    {/*Add User */ }
                    <Modal
                        opened={userModalOpen}
                        onClose={() => setUserModalOpen(false)}
                        title="Add User to Organization"
                        centered
                    >
                        <SearchUserProfile onUserSelected = {userSelected} />
                    </Modal>
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
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
