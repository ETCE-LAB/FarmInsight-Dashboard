import React, { useState, useEffect } from "react";
import { Container, Menu, TextInput, Text, List, Flex} from '@mantine/core';
import {IconSettings, IconChevronDown, IconCircleCheck, IconCircleMinus} from "@tabler/icons-react";
import { rem, Divider } from "@mantine/core";
import { Organization } from "../../../../features/organization/models/Organization";
import {useLocation, useNavigate} from "react-router-dom";
import { AppRoutes } from "../../../../utils/appRoutes";
import { getMyOrganizations } from "../../../../features/organization/useCase/getMyOrganizations";
import { useAuth } from "react-oidc-context";
import {Fpf} from "../../../../features/fpf/models/Fpf";
import {getOrganization} from "../../../../features/organization/useCase/getOrganization";

export const AppShell_Navbar: React.FC = () => {
    const [value, setValue] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState<{name: string, id: string}>({name: 'My Organizations', id: ''});
    const [organizations, setMyOrganizations] = useState<Organization[]>([]);
    const [selectedFPFId, setSelectedFPFId] = useState<string | null>(null);
    const [fpfList, setFpfList] = useState<Fpf[]>([])

    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (auth.isAuthenticated) {
            getMyOrganizations().then(resp => {
                if (resp) setMyOrganizations(resp);
            });
        }
    }, [auth.user]);

    useEffect(() => {
        if(auth.isAuthenticated) {
            const path = location.pathname.split('/');
            const organizationPathIndex = path.indexOf('organization');
            if (organizationPathIndex !== -1 && path.length > organizationPathIndex + 1) {
                const organizationId = path[organizationPathIndex + 1];
                getOrganization(organizationId).then(resp => {
                    if (resp) {
                        setFpfList(resp.FPFs)
                        setSelectedOrganization({name: resp.name, id: resp.id});

                        const fpfPathIndex = path.indexOf('fpf');
                        if (fpfPathIndex !== -1 && path.length > fpfPathIndex + 1) {
                            const fpfId = path[fpfPathIndex + 1];
                            setSelectedFPFId(fpfId);
                        }
                    }
                })
            } else {
                setSelectedFPFId(null);
                setFpfList([]);
                setSelectedOrganization({name: 'My Organizations', id: ''});
                getMyOrganizations().then(resp => {
                    if (resp) setMyOrganizations(resp);
                });
            }
        }
    }, [location]);

    const tabs = [
        {
            org: selectedOrganization,
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
        navigate(AppRoutes.organization.replace(':organizationId', id));
    };

    const handleFpfSelect = (id: string) => {
        navigate(AppRoutes.displayFpf.replace(':organizationId', selectedOrganization.id).replace(':fpfId', id));
    }

    const items = tabs.map((tab) => (
        <Flex key={tab.org.name} style={{ marginBottom: '1vh' }}>
            <Menu trigger="hover" openDelay={100} closeDelay={100} withinPortal >
                <Menu.Target>
                    <Text onClick={() => handleTabClick(tab.link)} style={{ marginBottom:'1vh', cursor: 'pointer', display: 'flex', alignItems: 'center',  gap: '0.5rem', fontSize: '40px' }}>
                        {tab.org.name}
                        <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={2} />
                    </Text>
                </Menu.Target>
                <Menu.Dropdown >
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
        </Flex>
    ));

    return (
        <Container size="fluid" style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
            <Flex
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr', // Zwei Spalten: erste für das Icon, zweite für die Items

                    gap: '1vw', // Abstand zwischen den Spalten
                    marginBottom: '20px',
                    marginTop: '2vh',
                    width: '100%',
                }}
            >
                <IconSettings
                    size={35}
                    style={{
                        cursor: 'pointer',
                    }}
                    stroke={2}
                    onClick={() => navigate(AppRoutes.organization.replace(':organizationId', selectedOrganization.id))}
                />
            </Flex>
            <Flex justify={"center"} >
                {items}
            </Flex>
            <Divider my="lg" style={{ width: '100%' }} />

            <TextInput
                variant="unstyled"
                style={{ display: 'flex', marginBottom: '5vh', width: '100%' }}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Search FPFs.."
            />

            <List style={{ width: '100%', marginTop: '1vh' }}>
                {fpfList &&
                    fpfList.map((fpf, index) => (
                        <List.Item
                            key={index}
                            style={{
                                cursor: 'pointer',
                                backgroundColor:
                                    selectedFPFId === fpf.id ? 'rgba(255, 255, 255, 0.1)' : '',
                                borderRadius: '6px',
                                border: 'none',
                                marginBottom: '16px',
                                listStyleType: 'none',
                            }}
                            onClick={() => {
                                handleFpfSelect(fpf.id);
                            }}
                        >
                            <Text
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: selectedFPFId === fpf.id ? '#199ff4' : '',
                                    fontSize: '20px',
                                    padding: '8px 16px',
                                }}
                            >
                                {selectedFPFId === fpf.id ? (
                                    <IconCircleCheck
                                        style={{ marginRight: '10px', color: '#16A34A' }}
                                    />
                                ) : (
                                    <IconCircleMinus
                                        style={{ marginRight: '10px', color: '#D97400' }}
                                    />
                                )}
                                {fpf.name}
                                <IconSettings
                                    style={{ width: rem(20), height: rem(20), marginRight: '15px', display: 'flex'}}
                                    stroke={2}
                                    cursor={'pointer'}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        navigate(AppRoutes.editFpf.replace(':organizationId', selectedOrganization.id)
                                                .replace(":fpfId", fpf.id))}
                                    }
                                />
                            </Text>
                        </List.Item>
                    ))}
            </List>
        </Container>
    );
};
