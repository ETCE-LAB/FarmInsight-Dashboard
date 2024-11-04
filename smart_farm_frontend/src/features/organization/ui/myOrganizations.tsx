import React, { useEffect, useState } from 'react';
import { Button, List, Loader, Box } from '@mantine/core';
import { useAuth } from 'react-oidc-context';
import axios from 'axios';

interface Organization {
    id: string;
    name: string;
}

export const UserOrganizations: React.FC = () => {
    const auth = useAuth();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        //TODO: Dat gät so nät
        const fetchOrganizations = async () => {
            try {
                if (auth.isAuthenticated) {
                    const response = await axios.get<Organization[]>('/organizations/own', {
                        headers: {
                            Authorization: `Bearer ${auth.user?.access_token}`,
                        },
                    });
                    setOrganizations(response.data);
                }
            } catch (err) {
                setError('Failed to load organizations');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, [auth.isAuthenticated]);

    if (!auth.isAuthenticated) {
        return (
            <Button onClick={() => auth.signinRedirect()} variant="filled" color="green">
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
