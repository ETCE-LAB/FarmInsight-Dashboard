import { Button, Title, Container, Flex, Group, Menu, rem, Text, TextInput, Modal } from '@mantine/core';
import { IconChevronDown } from "@tabler/icons-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { getMyOrganizations } from "../../../features/organization/useCase/getMyOrganizations";
import { Organization } from "../../../features/organization/models/Organization";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import {OrganizationForm} from "../../../features/organization/ui/organizationForm";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "../../../utils/appRoutes";

const LandingPage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const auth = useAuth();
    const [organizations, setOrganisations] = useState<Organization[]>([]);
    const [modalOpen, setModalOpen] = useState(false);  // State to manage modal visibility
    const organizationEventListener = useSelector((state: RootState) => state.organization.createdOrganizationEvent);
    const navigate =useNavigate()

    useEffect(() => {
        if (auth.isAuthenticated) {
            getMyOrganizations().then(resp => {
                setOrganisations(resp);
            });
        }
    }, [auth.user, organizationEventListener]);

    // Dropdown menu for organizations
    const tabs = [
        {
            name: 'My Organizations',
            color: '#000000',
            link: './my-organizations',
            submenu: organizations.map((org) => ({ name: org.name, link: `./organization/${org.id}` }))
        },
    ];

    const handleTabClick = (link = '/') => {
        if (link) {
            console.log(link);
        } else {
            console.warn('No link provided for this tab.');
        }
    };

    const items = tabs.map((tab) => (
        <div key={tab.name} style={{ marginBottom: '20px' }}>
            <Menu trigger="hover" openDelay={100} closeDelay={100} withinPortal>
                <Menu.Target>
                    <Text onClick={() => handleTabClick(tab.link)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {tab.name}
                        <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={2} />
                    </Text>
                </Menu.Target>
                <Menu.Dropdown>
                    {tab.submenu.map((option) => (
                        <Menu.Item key={option.link} onClick={() => navigate(AppRoutes.organization)}>
                            {option.name}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    ));

    return (
        < >
            <Container>
                <Flex>
                    <Group>
                        <TextInput
                            placeholder="Search FPFs"
                            style={{ width: '30vw' }}
                        />
                        {items}
                        {auth.isAuthenticated ? (
                            <Button
                                onClick={() => setModalOpen(true)}
                                variant="filled"
                                color="#105385"
                                style={{ margin: '0 10px' }}
                            >
                                Create Organization
                            </Button>
                        ) : null}
                    </Group>
                </Flex>
            </Container>
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add your Organization"
                centered={true}
            >
                <OrganizationForm />
            </Modal>
        </>
    );
};

export default LandingPage;
