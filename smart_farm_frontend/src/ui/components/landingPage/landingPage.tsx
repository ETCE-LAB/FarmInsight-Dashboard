import { Button, Container, Flex, Group, Menu, rem, TextInput, Modal, Card, Title, Image, Box, Pagination, Text, Grid } from '@mantine/core';
import {IconChevronDown, IconZoomScan, IconDroplet, IconTemperature, IconSunHigh, IconCircleCheck, IconCircleMinus} from "@tabler/icons-react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { getMyOrganizations } from "../../../features/organization/useCase/getMyOrganizations";
import { Organization } from "../../../features/organization/models/Organization";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { OrganizationForm } from "../../../features/organization/ui/organizationForm";
import {useNavigate, useParams} from "react-router-dom";
import { AppRoutes } from "../../../utils/appRoutes";
import {Fpf} from "../../../features/fpf/models/Fpf";
import placeholderImage from "../../../placeholder.png";
import {getFpf} from "../../../features/fpf/useCase/getFpf";
import {Sensor} from "../../../features/sensor/models/Sensor";

const LandingPage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const auth = useAuth();
    const { organizationId, fpfId } = useParams();
    const [organizations, setOrganisations] = useState<Organization[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const organizationEventListener = useSelector((state: RootState) => state.organization.createdOrganizationEvent);
    const navigate = useNavigate();
    const [fpf, setFpf] = useState<Fpf>({id:"0", name:"", isPublic:true, Sensors:[], Cameras:[], sensorServiceIp:"", address:""});
    const [sensors, setSensor]= useState<Sensor[]>()
    const [fpfs, setFpfs] = useState([]);

    useEffect(() => {
        if(fpfId) {
            getFpf(fpfId).then(resp => {
                setFpf(resp)
            })
        }
    }, [fpfId]);

    useEffect(() => {
        if(fpf?.Sensors && fpf.Sensors.length >= 1 ){
            setSensor(fpf.Sensors)
        }
    }, [fpf]);

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

            {/*<Container style={{overflowY: "hidden"}}>
                    <Grid>
                        <Grid.Col span={4}>
                        <Card p="lg" shadow="sm" radius="md" style={{ margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                        <Flex justify="space-between" align="center" mb="sm">
                            <Title order={3} style={{ color: '#199ff4' }}>{fpf?.name}</Title>
                            <Text c="blue">
                                {fpf.address}
                            </Text>
                            <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>
                            <IconTemperature style={{ color: '#105385' }}/>
                            <IconSunHigh style={{ color: '#105385' }}/>
                            <IconDroplet style={{ color: '#105385' }}/>
                            <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>
                            {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                            {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                            {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                            {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                            {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}
                        </Flex>

                        <Box style={{ height: 'auto' }}>
                            <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Card></Grid.Col>*/}

            <Container style={{overflowY: "hidden"}}>
                <Grid>
                    {fpfs.map((fpf) => (
                        <Grid.Col span={4}>
                            <Card p="lg" shadow="sm" radius="md" style={{ margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Flex justify="space-between" align="center" mb="sm">
                                    <Title order={3} style={{ color: '#199ff4' }}>{fpf.name}</Title>
                                    <Text c="blue">{fpf.organization.address}</Text>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>
                                    <IconTemperature style={{ color: '#105385' }}/>
                                    <IconSunHigh style={{ color: '#105385' }}/>
                                    <IconDroplet style={{ color: '#105385' }}/>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>
                                    {/*{fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                                    {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}*/}
                                </Flex>

                                <Box style={{ height: 'auto' }}>
                                    <Image src={fpf.lastImageUrl || placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            </Card></Grid.Col>)}
                        <Grid.Col span={4}>
                            <Card p="lg" shadow="sm" radius="md" style={{ margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Flex justify="space-between" align="center" mb="sm">
                                    <Title order={3} style={{ color: '#199ff4' }}>Tolles FPF</Title>
                                    <Text c="blue">
                                        Goslar
                                    </Text>
                                    {/*{fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                                    {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}*/}
                                </Flex>

                                <Box style={{ height: 'auto' }}>
                                    <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            </Card></Grid.Col>
                        <Grid.Col span={4}>
                            <Card p="lg" shadow="sm" radius="md" style={{ margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Flex justify="space-between" align="center" mb="sm">
                                    <Title order={3} style={{ color: '#199ff4' }}>{fpf?.name}</Title>
                                    <Text c="blue">
                                        {fpf.address}
                                    </Text>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>
                                    <IconTemperature style={{ color: '#105385' }}/>
                                    <IconSunHigh style={{ color: '#105385' }}/>
                                    <IconDroplet style={{ color: '#105385' }}/>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>
                                    {/*{fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                                    {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}*/}
                                </Flex>

                                <Box style={{ height: 'auto' }}>
                                    <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            </Card></Grid.Col>
                        <Grid.Col span={4}>
                            <Card p="lg" shadow="sm" radius="md" style={{ margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Flex justify="space-between" align="center" mb="sm">
                                    <Title order={3} style={{ color: '#199ff4' }}>{fpf?.name}</Title>
                                    <Text c="blue">
                                        {fpf.address}
                                    </Text>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>
                                    <IconTemperature style={{ color: '#105385' }}/>
                                    <IconSunHigh style={{ color: '#105385' }}/>
                                    <IconDroplet style={{ color: '#105385' }}/>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>
                                    {/*{fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                                    {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}*/}
                                </Flex>

                                <Box style={{ height: 'auto' }}>
                                    <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            </Card></Grid.Col>
                        <Grid.Col span={4}>
                            <Card p="lg" shadow="sm" radius="md" style={{ margin: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Flex justify="space-between" align="center" mb="sm">
                                    <Title order={3} style={{ color: '#199ff4' }}>{fpf?.name}</Title>
                                    <Text c="blue">
                                        {fpf.address}
                                    </Text>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>
                                    <IconTemperature style={{ color: '#105385' }}/>
                                    <IconSunHigh style={{ color: '#105385' }}/>
                                    <IconDroplet style={{ color: '#105385' }}/>
                                    <Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>
                                    {/*{fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PPM</Text>):("")}
                                    {fpf.sensor ? (<IconTemperature style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconSunHigh style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<IconDroplet style={{ color: '#105385' }}/>):("")}
                                    {fpf.sensor ? (<Text size="xs" style={{ fontWeight: 'bold', color: '#105385' }}>PH</Text>):("")}*/}
                                </Flex>

                                <Box style={{ height: 'auto' }}>
                                    <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                                </Box>
                            </Card></Grid.Col>
                </Grid>
                <Flex justify="center" mt="lg">
                    <Pagination total={10} siblings={2} defaultValue={1} />
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
