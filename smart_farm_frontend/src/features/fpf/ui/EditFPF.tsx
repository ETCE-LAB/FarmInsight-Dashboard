import React, { useEffect, useState } from "react";
import { Fpf } from "../models/Fpf";
import { useParams } from "react-router-dom";
import { getFpf } from "../useCase/getFpf";
import { FpfForm } from "./fpfForm";
import { getOrganization } from "../../organization/useCase/getOrganization";
import { Organization } from "../../organization/models/Organization";
import {Card, Stack, Accordion, Button, Group, Text, Flex, Badge, Title, Grid} from "@mantine/core";
import { Sensor } from "../../sensor/models/Sensor";
import { SensorList } from "../../sensor/ui/SensorList";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { CameraList } from "../../camera/ui/CameraList";
import { Camera } from "../../camera/models/camera";
import {useTranslation} from "react-i18next";

export const EditFPF: React.FC = () => {
    const { organizationId, fpfId } = useParams();
    const { t } = useTranslation();
    const [organization, setOrganization] = useState<Organization>();
    const [fpf, setFpf] = useState<Fpf>({
        id: "0", name: "", isPublic: true, Sensors: [], Cameras: [], sensorServiceIp: "", address: "", GrowingCycles: []
    });
    const [sensors, setSensor] = useState<Sensor[]>();
    const [cameras, setCamera] = useState<Camera[]>();

    const SensorEventListener = useSelector((state: RootState) => state.sensor.receivedSensorEvent);
    const CameraEventListener = useSelector((state: RootState) => state.camera.createdCameraEvent);

    useEffect(() => {
        if (fpfId) {
            getFpf(fpfId).then(resp => {
                setFpf(resp);
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

    const togglePublic = () => {
        setFpf((prevFpf) => ({ ...prevFpf, isPublic: !prevFpf.isPublic }));
    };

    return (
        <Stack gap={"md"}>
                <Card padding="xl" radius="md">
                    <Grid>
                        <Grid.Col span={12}>
                            <Title order={2}>{'FpF-'+t('header.name')+': '+fpf.name}</Title>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Text size="lg" c="dimmed">
                                {t('fpf.address')}: {fpf.address || t('fpf.noAddress')}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Text size="lg" c="dimmed">
                                {t('header.status')}:{" "}
                                <Badge color={fpf.isPublic ? "green" : "red"} variant="light" size="sm">
                                    {fpf.isPublic ? t('header.public') : t('header.private')}
                                </Badge>
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Card>
            {/* Accordion for FPF */}
            <Accordion>
                <Accordion.Item value="fpf">
                    <Accordion.Control>{t('fpf.editFpF')}</Accordion.Control>
                    <Accordion.Panel>
                        <Card padding="lg" radius="md">
                            <FpfForm toEditFpf={fpf} />
                        </Card>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            {/* Accordion for Sensor List */}
            <Accordion>
                <Accordion.Item value="sensors">
                    <Accordion.Control>{t('sensor.title')}</Accordion.Control>
                        <Accordion.Panel>
                            <Card padding="lg" radius="md">
                                <SensorList sensorsToDisplay={sensors} fpfId={fpf.id} />
                            </Card>
                        </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            {/* Accordion for Camera List */}
            <Accordion>
                <Accordion.Item value="cameras">
                    <Accordion.Control>{t('camera.cameraList')}</Accordion.Control>
                        <Accordion.Panel>
                            <Card padding="lg" radius="md">
                                <CameraList camerasToDisplay={cameras} />
                            </Card>
                        </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    );
};
