import { Button, Container, Flex, Group, Menu, rem, TextInput, Modal, Card, Title, Image, Box, Pagination, Text, Grid } from '@mantine/core';
import {IconChevronDown, IconZoomScan, IconDroplet, IconTemperature, IconSunHigh, IconCircleCheck, IconCircleMinus} from "@tabler/icons-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { getMyOrganizations } from "../../../features/organization/useCase/getMyOrganizations";
import { Organization } from "../../../features/organization/models/Organization";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { OrganizationForm } from "../../../features/organization/ui/organizationForm";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../utils/appRoutes";
import {receiveVisibleFpfs} from "../../../features/fpf/useCase/receiveVisibleFpfs";
import {BasicFPF} from "../../../features/fpf/models/BasicFPF";
import { useTranslation } from 'react-i18next';
import Footer from "../footer/footer";

const LandingPage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const auth = useAuth();
    const [organizations, setOrganisations] = useState<Organization[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const organizationEventListener = useSelector((state: RootState) => state.organization.createdOrganizationEvent);
    const navigate = useNavigate();
    const [fpfs, setFpfs] = useState<BasicFPF[]>([]);
    const { t, i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredFpfs = fpfs?.filter((fpf) =>
        fpf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fpf.organization.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedFpfs = filteredFpfs?.slice(startIndex, endIndex);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when search term changes
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        receiveVisibleFpfs().then(r =>
        setFpfs(r))
    }, []);


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
            name: t('header.organizations'),
            //color: '#000000',
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

    const handleFpfSelect = (organizationId:string, fpfId:string) => {
        navigate(AppRoutes.displayFpf.replace(':organizationId', organizationId).replace(':fpfId', fpfId));
    };

    const items = tabs.map((tab) => (
        <Menu key={tab.name} trigger="hover" openDelay={100} closeDelay={100} withinPortal>
            <Menu.Target>
                <Button
                    onClick={() => handleTabClick(tab.link)}
                    variant="filled"
                    color="#199ff4"
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
                            placeholder={t('header.search')}
                            style={{ width: '30vw' }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {items}
                        {auth.isAuthenticated ? (
                            <Button
                                onClick={() => setModalOpen(true)}
                                variant="filled"
                                color="#199ff4"
                            >
                                {t('header.createOrganization')}
                            </Button>
                        ) : null}
                    </Group>
                </Flex>
            </Container>

            <Container style={{overflowX: "hidden"}}>
                <Grid>
                    {paginatedFpfs && paginatedFpfs.map((fpf) => (
                        <Grid.Col span={4}>
                            <Card p="lg" radius="md" style={{ height: '20vh', margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', cursor:'pointer', borderBottom: '2px solid #ffffff' }}
                            onClick={() => {handleFpfSelect(fpf.organization.id, fpf.id);}}>
                                <Flex justify="space-between" align="center" mb="sm">
                                    <Title order={3} style={{ fontSize: '1rem', color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fpf.name}</Title>
                                    <Text c="#ccc">{fpf.organization.name}</Text>
                                    {/*{fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                                    {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}*/}
                                </Flex>
                                <Box style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {fpf.lastImageUrl?.length > 0 && (
                                        <Image src={`${fpf.lastImageUrl}`} alt="Last Received Image" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />)}
                                </Box>
                            </Card>
                        </Grid.Col>))}
                </Grid>
                <Flex justify="center" mt="lg">
                    <Pagination
                    total={Math.ceil(fpfs?.length / ITEMS_PER_PAGE) || 1}
                    siblings={2}
                    defaultValue={currentPage}
                    onChange={handlePageChange}
                />
                </Flex>
            </Container>
            <Footer />
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title={t("header.addOrganization")}
                centered={true}
            >
                <OrganizationForm />
            </Modal>
        </>
    );
};

export default LandingPage;
