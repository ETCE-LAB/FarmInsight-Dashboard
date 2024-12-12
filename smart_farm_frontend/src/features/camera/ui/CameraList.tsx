import React, {useEffect, useState} from "react";
import {ActionIcon, Box, Group, Modal, Switch, Table} from "@mantine/core";
import {IconEdit, IconPlus} from "@tabler/icons-react";
import {Camera, EditCamera} from "../models/camera";
import {CameraForm} from "./CameraForm";
import {useParams} from "react-router-dom";


export const CameraList:React.FC<{camerasToDisplay?:Camera[]}> = ({camerasToDisplay}) => {
    const [CameraModalOpen, setCameraModalOpen] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState<EditCamera | undefined>(undefined);
    const { organizationId, fpfId } = useParams();


    const onClickEdit = (camera: Camera) => {
            if(fpfId) {
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
                setCameraModalOpen(true)
            }
        }



    return (
        <Box>
            {/* Add FpF Modal */}
            <Modal
                opened={CameraModalOpen}
                onClose={() => setCameraModalOpen(false)}
                title={selectedCamera ? "Edit Camera": "Create Camera"}
                centered
            >
                <CameraForm toEditCamera={selectedCamera} />
            </Modal>

            <Group mb="md">
                <h2>Camera</h2>
                <IconPlus size={16}
                          stroke={3}
                          onClick={ () => setCameraModalOpen(true)}
                          style={{cursor:"pointer"}} />
            </Group>
            <Table highlightOnHover>
                <thead>
                <tr>

                    <Table.Th>Name</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Resolution</Table.Th>
                    <Table.Th>ModelNr</Table.Th>
                    <Table.Th>Interval</Table.Th>
                    <Table.Th>SnapshotURL</Table.Th>
                    <Table.Th>LivestreamURL</Table.Th>
                    <Table.Th>Is Active?</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </tr>
                </thead>
                <tbody>
                {camerasToDisplay && camerasToDisplay.map((camera, index) => (
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
                                        style={{cursor:"pointer"}} />
                                </ActionIcon>
                            </Group>
                        </Table.Td>
                    </Table.Tr>
                ))}
                </tbody>
            </Table>
        </Box>
    );
};

