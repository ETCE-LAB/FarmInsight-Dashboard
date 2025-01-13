import React, { useEffect, useState } from "react";
import { EditSensor, Sensor } from "../models/Sensor";
import { ActionIcon, Box, Group, Modal, Switch, Table, Text } from "@mantine/core";
import {IconCirclePlus, IconEdit, IconPlus} from "@tabler/icons-react";
import { SensorForm } from "./SensorForm";
import { useAppSelector } from "../../../utils/Hooks";
import { receivedSensorEvent } from "../state/SensorSlice";
import { useTranslation } from "react-i18next";

export const SensorList: React.FC<{ sensorsToDisplay?: Sensor[], fpfId: string }> = ({ sensorsToDisplay, fpfId }) => {
    const [sensor, setSensor] = useState<Sensor[]>([]);
    const [sensorModalOpen, setSensorModalOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState<EditSensor | undefined>(undefined);
    const { t } = useTranslation();

    const sensorReceivedEventListener = useAppSelector(receivedSensorEvent);

    useEffect(() => {
        if (sensorsToDisplay) {
            setSensor(sensorsToDisplay);
        }
    }, [sensorsToDisplay, sensorReceivedEventListener]);

    const onClickEdit = (sensor: Sensor) => {
        const editSensor: EditSensor = {
            id: sensor.id,
            name: sensor.name,
            unit: sensor.unit,
            location: sensor.location,
            modelNr: sensor.modelNr,
            intervalSeconds: sensor.intervalSeconds,
            isActive: sensor.isActive,
            fpfId,
            hardwareConfiguration: {
                sensorClassId: "",
                additionalInformation: {},
            }
        };

        setSelectedSensor(editSensor);
        setSensorModalOpen(true);
    }

    const onClickAddSensor = () => {
        setSelectedSensor(undefined);
        setSensorModalOpen(true);
    }

    return (
        <Box>
            {/* Add Sensor Modal */}
            <Modal
                opened={sensorModalOpen}
                onClose={() => setSensorModalOpen(false)}
                title={selectedSensor ? "Edit Sensor" : "Create Sensor"}
                centered
            >
                <SensorForm toEditSensor={selectedSensor} setClosed={setSensorModalOpen} />
            </Modal>

            {/* Header with Add Button */}
            <Group mb="md" justify="space-between">
                <h2>{t('sensor.title')}</h2>
                <IconCirclePlus
                    size={25}
                    stroke={2}
                    color={"#105385"}
                    onClick={() => onClickAddSensor()}
                    style={{ cursor: "pointer" }}
                />
            </Group>


            {/* Conditional Rendering of Table */}
            {sensorsToDisplay && sensorsToDisplay.length > 0 ? (
                <Table highlightOnHover>
                    <thead>
                    <tr>
                        <Table.Th>{t('sensorList.name')}</Table.Th>
                        <Table.Th>{t('sensorList.location')}</Table.Th>
                        <Table.Th>{t('sensorList.unit')}</Table.Th>
                        <Table.Th>{t('sensorList.modelNr')}</Table.Th>
                        <Table.Th>{t('sensorList.intervalSeconds')}</Table.Th>
                        <Table.Th>{t('sensorList.isActive')}</Table.Th>
                        <Table.Th>{t('sensorList.actions')}</Table.Th>
                    </tr>
                    </thead>
                    <tbody>
                    {sensorsToDisplay.map((sensor, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{sensor.name}</Table.Td>
                            <Table.Td>{sensor.location}</Table.Td>
                            <Table.Td>{sensor.unit}</Table.Td>
                            <Table.Td>{sensor.modelNr}</Table.Td>
                            <Table.Td>{sensor.intervalSeconds}</Table.Td>
                            <Table.Td>
                                <Switch checked={sensor.isActive} />
                            </Table.Td>
                            <Table.Td>
                                <Group>
                                    <ActionIcon color="blue">
                                        <IconEdit
                                            size={16}
                                            stroke={2}
                                            onClick={() => onClickEdit(sensor)}
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
                <Text>{t("sensor.noSensorsFound")}</Text>
            )}
        </Box>
    );
};
