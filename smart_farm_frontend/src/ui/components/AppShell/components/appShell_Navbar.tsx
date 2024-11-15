import React, { useState, useEffect } from "react";
import { Card, Container, Menu, TextInput, Text, List } from '@mantine/core';
import {IconSettings, IconChevronDown, IconCircleCheck, IconCircleMinus, IconUsers} from "@tabler/icons-react";
import { rem, Divider } from "@mantine/core";
import { Organization } from "../../../../features/organization/models/Organization";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../utils/appRoutes";
import { getMyOrganizations } from "../../../../features/organization/useCase/getMyOrganizations";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";

export const AppShell_Navbar: React.FC = () => {
    const [value, setValue] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<{name: string, id: string}>({name: 'My Organizations', id: ''});
    const [organizations, setMyOrganizations] = useState<Organization[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
            org: selectedOrganization,
            color: '#000000',
            link: './my-organizations',
            submenu: organizations.map((org) => ({ name: org.name, id: org.id })),
        },
    ];

    const handleTabClick = (link = '/') => {
        if (link) {
            console.log(link);
        } else {
            console.warn('No link provided for this tab.');
        }
    };

    const handleOrganizationSelect = (name: string, id: string) => {
        setSelectedOrganization({ name, id });
        navigate(AppRoutes.organization.replace(':name', name), { state : { id: id}});
    };

    const items = tabs.map((tab) => (
        <div key={tab.org.name} style={{ marginBottom: '20px' }}>
            <Menu trigger="hover" openDelay={100} closeDelay={100} withinPortal>
                <Menu.Target>
                    <Text onClick={() => handleTabClick(tab.link)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {tab.org.name}
                        <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={2} />
                    </Text>
                </Menu.Target>
                <Menu.Dropdown>
                    {tab.submenu.map((option) => (
                        <Menu.Item
                            key={option.id}
                            onClick={() => handleOrganizationSelect(option.name, option.id)}
                        >
                            {option.name}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    ));

    return (
        <Container size="fluid" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
            <Container style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <IconSettings
                    style={{ width: rem(20), height: rem(20), marginRight: '15px', display: 'flex' }}
                    stroke={2}
                    cursor={'pointer'}
                    onClick={() => navigate(AppRoutes.organization.replace(':name', selectedOrganization.name), { state: { id: selectedOrganization.id }})}
                />
                {items}
            </Container>

            <Divider my="lg" style={{ width: '100%' }} />

            <TextInput
                variant="unstyled"
                style={{ display: 'flex', marginBottom: '5vh', width: '100%' }}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Search FPFs.."
            />

            <List style={{ paddingLeft: 0, width: '100%', marginTop: '1vh' }}>
                {['FPF 1', 'FPF 2', 'FPF 3', 'FPF 4', 'FPF 5'].map((fpf, index) => (
                    <List.Item
                        key={index}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: selectedIndex === index ? '#D7F3FF' : 'white',
                            border: 'none',
                            marginBottom: '16px',
                            listStyleType: 'none',
                        }}
                        onClick={() => {
                            setSelectedIndex(index);
                            if (fpf === 'FPF 1') {
                                navigate(AppRoutes.editFpf);
                            }
                        }}
                    >
                        <Text
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: selectedIndex === index ? '#105385' : 'black',
                                fontSize: '20px',
                            }}
                        >
                            {selectedIndex === index ? (
                                <IconCircleCheck style={{ marginRight: '10px', color: '#16A34A' }} />
                            ) : (
                                <IconCircleMinus style={{ marginRight: '10px', color: '#D97400' }} />
                            )}
                            {fpf}
                        </Text>
                    </List.Item>
                ))}
            </List>
        </Container>
    );
};
