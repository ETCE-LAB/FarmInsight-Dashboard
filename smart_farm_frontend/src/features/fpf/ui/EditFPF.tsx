import React, { useEffect, useState } from "react";
import { Fpf } from "../models/Fpf";
import { useParams } from "react-router-dom";
import { getFpf } from "../useCase/getFpf";
import { FpfForm } from "./fpfForm";
import { getOrganization } from "../../organization/useCase/getOrganization";
import { Organization } from "../../organization/models/Organization";
import { Card, Stack, Accordion, Button, Group, Text, Flex, Badge, Title, Grid, Modal } from "@mantine/core";
import { Sensor } from "../../sensor/models/Sensor";
import { SensorList } from "../../sensor/ui/SensorList";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { CameraList } from "../../camera/ui/CameraList";
import { Camera } from "../../camera/models/camera";
import { useTranslation } from "react-i18next";
import { IconEdit } from "@tabler/icons-react";
import { receiveUserProfile } from "../../userProfile/useCase/receiveUserProfile";
import {useAppDispatch} from "../../../utils/Hooks";
import {updatedFpf} from "../state/FpfSlice";

export const EditFPF: React.FC = () => {
    const { organizationId, fpfId } = useParams();
    const { t } = useTranslation();
    const [organization, setOrganization] = useState<Organization>();

    const [sensors, setSensor] = useState<Sensor[]>();
    const [cameras, setCamera] = useState<Camera[]>();

    const [editModalOpen, setEditModalOpen] = useState(false);  // State to control modal visibility

    const SensorEventListener = useSelector((state: RootState) => state.sensor.receivedSensorEvent);
    const CameraEventListener = useSelector((state: RootState) => state.camera.createdCameraEvent);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const fpf = useSelector((state: RootState) => state.fpf.fpf);


    const dispatch = useAppDispatch();

    useEffect(() => {
        if (fpfId) {
            getFpf(fpfId).then(resp => {
                dispatch(updatedFpf(resp));
            });
        }
    }, [fpfId]);

    useEffect(() => {
        if (fpf?.Sensors && fpf.Sensors.length >= 1) {
            setSensor(fpf.Sensors);
        }
    }, [fpf]);

    useEffect(() => {
        if (organizationId) {
            getOrganization(organizationId).then(resp => {
                setOrganization(resp);
            });
        }
    }, [organizationId]);

    useEffect(() => {
        if (fpfId) {
            getFpf(fpfId).then((resp) => {
                setSensor(resp.Sensors);
            });
        }
    }, [SensorEventListener]);

    useEffect(() => {
        if (fpfId) {
            getFpf(fpfId).then((resp) => {
                setCamera(resp.Cameras);
            });
        }
    }, [CameraEventListener]);

    useEffect(() => {
        if (fpf && organization) {
            receiveUserProfile().then((user) => {
                const userIsAdmin = organization.memberships.some(
                    (member) => member.userprofile.id === user.id && member.membershipRole === "admin"
                );
                setIsAdmin(userIsAdmin);
            });
        }
    }, [fpf, organization]);


    return (
        <Stack gap={"md"}>
            <Card padding="xl" radius="md">
                <Grid>
                    <Grid.Col span={12}>
                        <Flex align="center" style={{ marginBottom: "10px" }}>
                            <Title order={2}>
                                {'FPF-' + t("header.name")}: {fpf.name}
                            </Title>
                            <Flex align="center" style={{ marginLeft: "auto" }}>
                                {isAdmin && (
                                    <IconEdit
                                        size={24}
                                        onClick={() => setEditModalOpen(true)}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#199ff4',
                                            marginLeft: 10,
                                        }}
                                    />
                                )}
                            </Flex>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text size="lg" fw="bold" c="dimmed">
                            {t('header.status')}:{" "}
                            <Badge color={fpf.isPublic ? "green" : "red"} variant="light" size="sm">
                                {fpf.isPublic ? t('header.public') : t('header.private')}
                            </Badge>
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text size="lg" fw="bold" c="dimmed">
                            {t('fpf.address')}: {fpf.address || t('fpf.noAddress')}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Card>

            {/* Edit FPF Modal */}
            <Modal
                opened={editModalOpen}
                onClose={() => setEditModalOpen(false)}  // Close modal when canceled
                title={t('fpf.editFpF')}
                centered
            >
                <FpfForm toEditFpf={fpf} close={setEditModalOpen} />
            </Modal>

            {/* Accordion for Sensor List */}
            <Accordion variant="separated">
                <Accordion.Item value="sensors">
                    <Accordion.Control>{t('sensor.title')}</Accordion.Control>
                    <Accordion.Panel>
                        <Card padding="lg" radius="md">
                            <SensorList sensorsToDisplay={sensors} fpfId={fpf.id} isAdmin={isAdmin} />
                        </Card>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            {/* Accordion for Camera List */}
            <Accordion variant="separated">
                <Accordion.Item value="cameras">
                    <Accordion.Control>{t('camera.cameras')}</Accordion.Control>
                    <Accordion.Panel>
                        <Card padding="lg" radius="md">
                            <CameraList camerasToDisplay={cameras} isAdmin={isAdmin} />
                        </Card>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    );
};
