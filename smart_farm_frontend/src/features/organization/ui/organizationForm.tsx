import React, { useState, useEffect } from 'react';
import { Button, TextInput, Switch, Box } from "@mantine/core";
import { useAuth } from "react-oidc-context";
import { createOrganization } from "../useCase/createOrganization";
import { useDispatch } from "react-redux";
import { createdOrganization } from "../state/OrganizationSlice";
import { useNavigate } from "react-router-dom";
import {AppRoutes} from "../../../utils/appRoutes";

export const OrganizationForm: React.FC = () => {
    const auth = useAuth();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = () => {
        createOrganization({ name, isPublic }).then((org) =>
        {
            dispatch(createdOrganization());
            if (org)
                navigate(AppRoutes.editOrganization.replace(":name", org.name));
        }
        );
    };

    return (
        <>
            {!auth.isAuthenticated ? (
                <Button
                    onClick={() => auth.signinRedirect()}
                    variant="filled"
                    color="#105385"
                    style={{ margin: '10px' }}
                >
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
                        mt="xs" // margin-top
                        mb="md" // margin-bottom
                        style={{ width: '100%' }}
                    />
                    <Switch
                        label="Set Public"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.currentTarget.checked)}
                        mt="sm"
                        mb="md"
                    />
                    <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="filled"
                            color="#105385"
                            style={{ margin: '10px' }}
                        >
                            Create
                        </Button>
                    </Box>
                </form>
            )}
        </>
    );
};