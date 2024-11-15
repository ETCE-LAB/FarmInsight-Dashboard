// appShell_Navbar.tsx

import React, { useState, useEffect } from "react";
import { Card, Container, Menu, TextInput, Text } from '@mantine/core';
// @ts-ignore
import { IconSettings } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { Organization } from "../../../../features/organization/models/Organization";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../utils/appRoutes";
import { getMyOrganizations } from "../../../../features/organization/useCase/getMyOrganizations";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";

export const AppShell_Navbar: React.FC = () => {
    const [value, setValue] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<string>('My Organizations');
    const [organizations, setMyOrganizations] = useState<Organization[]>([]);
    const navigate = useNavigate();
    const auth = useAuth();
    const organizationEventListener = useSelector((state: RootState) => state.organization.createdOrganizationEvent);

    useEffect(() => {
        if (auth.isAuthenticated) {
            getMyOrganizations().then(resp => {
                if (resp) setMyOrganizations(resp);
            });
        }
    }, [auth.user, organizationEventListener]);

    const tabs = [
        {
            name: selectedOrganization,
            color: '#000000',
            link: './my-organizations',
            submenu: organizations.map((org) => ({ name: org.name, link: `./organization/${org.id}` })),
        },
    ];

    const handleTabClick = (link = '/') => {
        if (link) {
            console.log(link);
        } else {
            console.warn('No link provided for this tab.');
        }
    };

    const handleOrganizationSelect = (name: string, link: string) => {
        setSelectedOrganization(name);
        navigate(link);
    };

    const items = tabs.map((tab) => (
        <div key={tab.name} style={{ marginBottom: '20px' }}>
            <Menu trigger="hover" openDelay={100} closeDelay={100} withinPortal>
                <Menu.Target>
                    <Text onClick={() => handleTabClick(tab.link)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {tab.name}
                    </Text>
                </Menu.Target>
                <Menu.Dropdown>
                    {tab.submenu.map((option) => (
                        <Menu.Item
                            key={option.link}
                            onClick={() => handleOrganizationSelect(option.name, option.link)}
                        >
                            {option.name}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    ));

    return (
        <Container size="sm">
            <IconSettings
                style={{ width: rem(20), height: rem(20) }}
                stroke={2}
                cursor={'pointer'}
                onClick={() => navigate(AppRoutes.organization)}
            />
            {items}
            <TextInput
                style={{ marginBottom: '20px' }}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Search name"
            />
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ margin: '16px', cursor: 'pointer' }}
            >
                <Card.Section>
                    <Text style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '8px 16px',
                        color: '#105385',
                        fontSize: '30px',
                    }}>
                        FPF 1
                    </Text>
                </Card.Section>
            </Card>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ margin: '16px', cursor: 'pointer' }}
            >
                <Card.Section>
                    <Text style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '8px 16px',
                        color: '#105385',
                        fontSize: '30px',
                    }}>
                        FPF 2
                    </Text>
                </Card.Section>
            </Card>
        </Container>
    );
};
