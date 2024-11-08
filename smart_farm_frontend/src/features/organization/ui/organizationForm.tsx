import React, { useState, useEffect } from 'react';
import { Button, TextInput, Checkbox, Box } from "@mantine/core";
import { useAuth } from "react-oidc-context";
import {createOrganization} from "../useCase/createOrganization";
import {useDispatch} from "react-redux";
import {createdOrganization} from "../state/OrganizationSlice";


export const OrganizationForm: React.FC = () => {
    const auth = useAuth();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const dispatch = useDispatch();

    const handleSave = () => {
        createOrganization({name, isPublic}).then(r =>
            dispatch(createdOrganization())
        );

    };

    return (
        <>
            {!auth.isAuthenticated ? (
                <Button onClick={() => auth.signinRedirect()} variant="filled" color="#105385" style={{ margin: '10px' }}>
                    Login to manage organization
                </Button>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <TextInput
                        label="Organization Name"
                        placeholder="Enter organization name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        required
                    />
                    <Checkbox
                        label="Public"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.currentTarget.checked)}
                        mt="md"
                    />
                    <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                            {"Create Organization"}
                        </Button>
                    </Box>
                </form>
            )}
        </>
    );
};
