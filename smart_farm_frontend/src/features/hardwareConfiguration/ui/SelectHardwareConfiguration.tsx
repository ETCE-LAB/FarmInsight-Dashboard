import React, { useState, useEffect } from "react";
import { Table, ScrollArea, TextInput, Paper } from "@mantine/core";
import {FieldDescription, HardwareConfiguration} from "../models/HardwareConfiguration";
import {getAvailableHardwareConfiguration} from "../useCase/getAvailableHardwareConfiguration";
import {useParams} from "react-router-dom";

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const SelectHardwareConfiguration:React.FC<{ fpfId: string, postHardwareConfiguration(data: { sensorClassId: string, additionalInformation: Record<string, any>}): any }> = ({fpfId, postHardwareConfiguration}) => {
    const [hardwareConfiguration, setHardwareConfiguration] = useState<HardwareConfiguration[]>([]);
    const [selectedSensorClassId, setSelectedSensorClassId] = useState<string | null>(null);
    const [additionalInformation, setAdditionalInformation] = useState<Record<string, any>>([]);

    useEffect(() => {
        getAvailableHardwareConfiguration(fpfId).then(resp => {
                setHardwareConfiguration(resp)
            }
        )
    }, [fpfId]);

    useEffect(() => {
        if (selectedSensorClassId) {
            const config = hardwareConfiguration[hardwareConfiguration.findIndex((x) => x.sensorClassId === selectedSensorClassId)]
            let info: Record<string, any> = {};
            for (const field of config.fields) {
                info[field.name] = undefined;
            }
            setAdditionalInformation(info);
            postHardwareConfiguration({sensorClassId: selectedSensorClassId, additionalInformation: info});
        }
    }, [hardwareConfiguration, selectedSensorClassId, postHardwareConfiguration]);

    const handleFieldInputChanged = (name: string, value: string)=> {
        if (selectedSensorClassId) {
            let info = additionalInformation;
            info[name] = value;
            setAdditionalInformation(info);
            postHardwareConfiguration({sensorClassId: selectedSensorClassId, additionalInformation: info});
        }
    }

    return (
        <ScrollArea>
            <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Connection</Table.Th>
                    <Table.Th>Parameter</Table.Th>
                    <Table.Th>Tags</Table.Th>
                </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                {hardwareConfiguration.map((configuration) => (
                    <>
                        {/* Hauptzeile */}
                        <Table.Tr key={configuration.sensorClassId} onClick={() => setSelectedSensorClassId(configuration.sensorClassId)} style={{ cursor: "pointer" }}>
                            <Table.Td>{configuration.name}</Table.Td>
                            <Table.Td>{configuration.connection}</Table.Td>
                            <Table.Td>{configuration.parameter}</Table.Td>
                            <Table.Td>
                                {Object.entries(configuration.tags).map((tag,value) => (
                                    value
                                ))}
                            </Table.Td>
                        </Table.Tr>

                        {/* Ausklappbarer Bereich */}
                        {configuration.sensorClassId === selectedSensorClassId &&
                            <Table.Tr key={`details`}>
                                <Table.Td colSpan={4}>
                                    {configuration.fields.map((field) => (
                                        <TextInput label={`${capitalizeFirstLetter(field.name)}`}
                                            type={field.type}
                                            onChange={(e) => handleFieldInputChanged(field.name, e.target.value)}
                                        />
                                    ))}
                                </Table.Td>
                            </Table.Tr>
                        }
                    </>
                ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default SelectHardwareConfiguration;
