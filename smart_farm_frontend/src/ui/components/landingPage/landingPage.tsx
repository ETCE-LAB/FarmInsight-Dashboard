import {
    Button,
    Container,
    Flex,
    Group,
    Menu,
    rem,
    TextInput,
    Modal,
} from '@mantine/core';
import { IconChevronDown } from "@tabler/icons-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { getMyOrganizations } from "../../../features/organization/useCase/getMyOrganizations";
import { Organization } from "../../../features/organization/models/Organization";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { OrganizationForm } from "../../../features/organization/ui/organizationForm";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../utils/appRoutes";

const LandingPage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const auth = useAuth();
    const [organizations, setOrganisations] = useState<Organization[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const organizationEventListener = useSelector((state: RootState) => state.organization.createdOrganizationEvent);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            getMyOrganizations().then(resp => {
                if (resp)
                    setOrganisations(resp);
            });
        }
    }, [auth.user, organizationEventListener]);

    const tabs = [
        {
            name: 'Organization',
            color: '#000000',
            link: './my-organizations',
            submenu: organizations.map((org) => ({ name: org.name, id: org.id }))
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
        <Menu key={tab.name} trigger="hover" openDelay={100} closeDelay={100} withinPortal>
            <Menu.Target>
                <Button
                    onClick={() => handleTabClick(tab.link)}
                    variant="filled"
                    color="blue"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {tab.name}
                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={2} />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {tab.submenu.map((option) => (
                    <Menu.Item
                        key={option.id}
                        onClick={() => navigate(AppRoutes.organization.replace(':organizationId', option.id))}
                        style={{ padding: '10px 16px', fontSize: '14px' }}
                    >
                        {option.name}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    ));

    return (
        <>
            <Container>
                <Flex justify="center">
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
                                color="blue"
                            >
                                Create New Organization
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
