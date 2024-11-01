import React, { useState, useEffect } from 'react';
import { Button, TextInput, Checkbox, Box } from "@mantine/core";
import { useAuth } from "react-oidc-context";
import { receiveUserProfile } from "../../features/userProfile/useCase/receiveUserProfile";

interface OrganizationFormProps {
    initialData?: { name: string; isPublic: boolean };
    onSave: (data: { name: string; isPublic: boolean }) => void;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({ initialData, onSave }) => {
    const auth = useAuth();
    const [name, setName] = useState(initialData?.name || "");
    const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

    const handleSave = () => {
        onSave({ name, isPublic });
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            receiveUserProfile();
        }
    }, [auth.isAuthenticated]);

    return (
        <>
            {!auth.isAuthenticated ? (
                <Button onClick={() => auth.signinRedirect()} variant="filled" color="green">
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
                        <Button type="submit" variant="filled" color="blue">
                            {initialData ? "Save Changes" : "Create Organization"}
                        </Button>
                    </Box>
                </form>
            )}
        </>
    );
};
