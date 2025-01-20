import React, { useState } from "react";
import { Badge, Box, Group, Modal, Table, Text } from "@mantine/core";
import { IconCirclePlus, IconEdit, IconVideo, IconVideoOff, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Camera, EditCamera } from "../models/camera";
import { CameraForm } from "./CameraForm";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CameraList: React.FC<{ camerasToDisplay?: Camera[] }> = ({ camerasToDisplay }) => {
    const [CameraModalOpen, setCameraModalOpen] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState<EditCamera | undefined>(undefined);
    const [expandedUrls, setExpandedUrls] = useState<Record<number, boolean>>({});
    const { organizationId, fpfId } = useParams();
    const { t } = useTranslation();

    const toggleUrlExpansion = (index: number) => {
        setExpandedUrls((prev) => ({ ...prev, [index]: !prev[index] }));
    };

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
            <Group mb="md" justify="space-between">
                <h2>{t('camera.cameras')}</h2>
                <IconCirclePlus
                    size={25}
                    stroke={2}
                    color={"#199ff4"}
                    onClick={() => setCameraModalOpen(true)}
                    style={{ cursor: "pointer" }}
                />
            </Group>

            {/* Conditional Rendering of Table */}
            {camerasToDisplay && camerasToDisplay.length > 0 ? (
                <Table highlightOnHover withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t("header.name")}</Table.Th>
                            <Table.Th>{t("camera.location")}</Table.Th>
                            <Table.Th>{t("camera.resolution")}</Table.Th>
                            <Table.Th>{t("camera.modelNr")}</Table.Th>
                            <Table.Th>{t("camera.intervalSeconds")}</Table.Th>
                            <Table.Th>{t("camera.snapshotUrl")}</Table.Th>
                            <Table.Th>{t("camera.livestreamUrl")}</Table.Th>
                            <Table.Th>{t("header.status")}</Table.Th>
                            <Table.Th>{}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {camerasToDisplay.map((camera, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{camera.name}</Table.Td>
                                <Table.Td>{camera.location}</Table.Td>
                                <Table.Td>{camera.resolution}</Table.Td>
                                <Table.Td>{camera.modelNr}</Table.Td>
                                <Table.Td>{camera.intervalSeconds}</Table.Td>
                                <Table.Td>
                                    {expandedUrls[index] ? (
                                        <Group>
                                            <Text>{camera.snapshotUrl}</Text>
                                                <IconChevronUp
                                                    color={"#199ff4"}
                                                    cursor={"pointer"}
                                                    size={16}
                                                    onClick={() => toggleUrlExpansion(index)}
                                                />
                                        </Group>
                                    ) : (
                                        <Group>
                                            <Text>{camera.snapshotUrl?.slice(0, 20) + "..."}</Text>
                                                <IconChevronDown
                                                    color={"#199ff4"}
                                                    cursor={"pointer"}
                                                    size={16}
                                                    onClick={() => toggleUrlExpansion(index)}
                                                />
                                        </Group>
                                    )}
                                </Table.Td>
                                <Table.Td>
                                    {expandedUrls[index] ? (
                                        <Group>
                                            <Text>{camera.livestreamUrl}</Text>
                                                <IconChevronUp
                                                    color={"#199ff4"}
                                                    cursor={"pointer"}
                                                    size={16}
                                                    onClick={() => toggleUrlExpansion(index)}
                                                />
                                        </Group>
                                    ) : (
                                        <Group>
                                            <Text>{camera.livestreamUrl?.slice(0, 20) + "..."}</Text>
                                                <IconChevronDown
                                                    color={"#199ff4"}
                                                    cursor={"pointer"}
                                                    size={16}
                                                    onClick={() => toggleUrlExpansion(index)}
                                                />
                                        </Group>
                                    )}
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={camera.isActive ? "green.9" : "red.9"}
                                        variant="light"
                                        leftSection={camera.isActive ? <IconVideo size={16} /> : <IconVideoOff size={16} />}
                                    >
                                        {camera.isActive ? t("camera.active") : t("camera.inactive")}
                                    </Badge>
                                </Table.Td>
                                <Table.Td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Group>
                                        <IconEdit
                                            color={"#199ff4"}
                                            size={20}
                                            stroke={2}
                                            onClick={() => onClickEdit(camera)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            ) : (
                <Text>{t("camera.noCamerasFound")}</Text>
            )}
        </Box>
    );
};
