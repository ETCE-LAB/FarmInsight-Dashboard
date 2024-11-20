import React, { useState } from 'react';
import {Button, TextInput, Switch, Box, Popover} from "@mantine/core";
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

    const [createOrgaErrorListener , triggerCreateOrgaError] = useState(false)

    const handleSave = () => {
        createOrganization({ name, isPublic }).then((org) => {
            if (org) {
                dispatch(createdOrganization());
                const encodedName = encodeURI(org.name);
                triggerCreateOrgaError(false)
                navigate(AppRoutes.organization.replace(":name", encodedName));
            }
            else{
                triggerCreateOrgaError(true)
            }
        });
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
                    <Popover width={200} opened position="bottom-start" withArrow arrowPosition="side" arrowOffset={50} arrowSize={12}>
                        <Popover.Target>
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
                        </Popover.Target>
                        {createOrgaErrorListener && (<Popover.Dropdown>
                           Organization Name already taken
                        </Popover.Dropdown>
                        )}
                    </Popover>
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