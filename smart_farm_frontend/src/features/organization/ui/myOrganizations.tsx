import React, { useEffect, useState } from 'react';
import { Button, List, Loader, Box } from '@mantine/core';
import { useAuth } from 'react-oidc-context';
import axios from 'axios';
import {getMyOrganizations} from "../useCase/getMyOrganizations";
import {Organization} from "../models/Organization";

export const MyOrganizations: React.FC = () => {
    const auth = useAuth();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

            if (auth.isAuthenticated) {
                try {
                    getMyOrganizations().then(resp => {
                        setOrganizations(resp)
                    })
                } catch (err) {
                    setError('Failed to load organizations');
                } finally {
                    setLoading(false);
                }

            }
        },[auth.isAuthenticated])


    if (!auth.isAuthenticated) {
        return (
            <Button onClick={() => auth.signinRedirect()} variant="filled" color="#105385" style={{ margin: '0 10px' }}>
                Login to see your organizations
            </Button>
        );
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Box color="red">{error}</Box>;
    }

    return (
        <List>
            {organizations.map((org) => (
                <List.Item key={org.id}>{org.name}</List.Item>
            ))}
        </List>
    );
};
