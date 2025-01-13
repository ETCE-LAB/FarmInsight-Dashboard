import React, { useState } from "react";
import {ActionIcon, Box, Group, Modal, Switch, Table, Text} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { Camera, EditCamera } from "../models/camera";
import { CameraForm } from "./CameraForm";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CameraList: React.FC<{ camerasToDisplay?: Camera[] }> = ({ camerasToDisplay }) => {
    const [CameraModalOpen, setCameraModalOpen] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState<EditCamera | undefined>(undefined);
    const { organizationId, fpfId } = useParams();
    const { t } = useTranslation();

    const onClickEdit = (camera: Camera) => {
        if (fpfId) {
            const editCamera: EditCamera = {
                fpfId: fpfId,
                id: camera.id,
                name: camera.name,
                location: camera.location,
                modelNr: camera.modelNr,
                resolution: camera.resolution,
                isActive: camera.isActive,
                intervalSeconds: camera.intervalSeconds,
                snapshotUrl: camera.snapshotUrl,
                livestreamUrl: camera.livestreamUrl,
            };

            setSelectedCamera(editCamera);
            setCameraModalOpen(true);
        }
    };

    return (
        <Box>
            {/* Camera Modal */}
            <Modal
                opened={CameraModalOpen}
                onClose={() => setCameraModalOpen(false)}
                title={selectedCamera ? t("camera.editCamera") : t("camera.addCamera")}
                centered
            >
                <CameraForm toEditCamera={selectedCamera} setClosed={setCameraModalOpen} />
            </Modal>

            {/* Header with Add Button */}
            <Group mb="md">
                <h2>{t("camera.cameraList")}</h2>
                <IconPlus
                    size={16}
                    stroke={3}
                    onClick={() => setCameraModalOpen(true)}
                    style={{ cursor: "pointer" }}
                />
            </Group>

            {/* Conditional Rendering of Table */}
            {camerasToDisplay && camerasToDisplay.length > 0 ? (
                <Table highlightOnHover>
                    <thead>
                    <tr>
                        <Table.Th>{t("header.name")}</Table.Th>
                        <Table.Th>{t("camera.location")}</Table.Th>
                        <Table.Th>{t("camera.resolution")}</Table.Th>
                        <Table.Th>{t("camera.modelNr")}</Table.Th>
                        <Table.Th>{t("camera.intervalSeconds")}</Table.Th>
                        <Table.Th>{t("camera.snapshotUrl")}</Table.Th>
                        <Table.Th>{t("camera.livestreamUrl")}</Table.Th>
                        <Table.Th>{t("header.isActive")}</Table.Th>
                        <Table.Th>{t("header.actions")}</Table.Th>
                    </tr>
                    </thead>
                    <tbody>
                    {camerasToDisplay.map((camera, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{camera.name}</Table.Td>
                            <Table.Td>{camera.location}</Table.Td>
                            <Table.Td>{camera.resolution}</Table.Td>
                            <Table.Td>{camera.modelNr}</Table.Td>
                            <Table.Td>{camera.intervalSeconds}</Table.Td>
                            <Table.Td>{camera.snapshotUrl}</Table.Td>
                            <Table.Td>{camera.livestreamUrl}</Table.Td>
                            <Table.Td>
                                <Switch checked={camera.isActive} />
                            </Table.Td>
                            <Table.Td>
                                <Group>
                                    <ActionIcon color="blue">
                                        <IconEdit
                                            size={16}
                                            stroke={2}
                                            onClick={() => onClickEdit(camera)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <Text>{t("camera.noCamerasFound")}</Text>
            )}
        </Box>
    );
};
