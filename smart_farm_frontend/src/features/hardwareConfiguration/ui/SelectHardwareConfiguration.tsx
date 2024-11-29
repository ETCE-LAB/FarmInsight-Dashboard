import React, { useState, useEffect } from "react";
import {Table, ScrollArea, TextInput, Text, HoverCard} from "@mantine/core";
import { HardwareConfiguration} from "../models/HardwareConfiguration";
import {getAvailableHardwareConfiguration} from "../useCase/getAvailableHardwareConfiguration";

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface SelectHardwareConfigurationProps {
    fpfId: string,
    postHardwareConfiguration(data: { sensorClassId: string, additionalInformation: Record<string, any>}): any,
    setUnit(data: string): any,
    setModel(data: string): any
}

const SelectHardwareConfiguration:React.FC<SelectHardwareConfigurationProps> = ({fpfId, postHardwareConfiguration, setUnit, setModel}) => {
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
            if (config.unit !== 'manual')
                setUnit(config.unit);
            setModel(config.model);
            postHardwareConfiguration({sensorClassId: selectedSensorClassId, additionalInformation: info});
        }
    }, [hardwareConfiguration, selectedSensorClassId, postHardwareConfiguration, setUnit, setModel]);

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
                    <Table.Th>Model</Table.Th>
                    <Table.Th>Connection</Table.Th>
                    <Table.Th>Parameter</Table.Th>
                    <Table.Th>Unit</Table.Th>
                    <Table.Th>Tags</Table.Th>
                </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                {hardwareConfiguration.map((configuration) => (
                    <>
                        <Table.Tr key={configuration.sensorClassId} onClick={() => setSelectedSensorClassId(configuration.sensorClassId)} style={{ cursor: "pointer" }}>
                            <Table.Td>{configuration.model}</Table.Td>
                            <Table.Td>{configuration.connection}</Table.Td>
                            <Table.Td>{configuration.parameter}</Table.Td>
                            <Table.Td>{configuration.unit}</Table.Td>
                            <Table.Td>
                                {Object.entries(configuration.tags).map((tag) => (
                                    <HoverCard width={280} shadow="md">
                                        <HoverCard.Target>
                                            <Text>{tag[1]}</Text>
                                        </HoverCard.Target>
                                        <HoverCard.Dropdown>
                                            <Text size="sm">
                                                {tag[0]}
                                            </Text>
                                        </HoverCard.Dropdown>
                                    </HoverCard>
                                ))}
                            </Table.Td>
                        </Table.Tr>
                        {configuration.sensorClassId === selectedSensorClassId &&
                            <>
                                <Table.Tr key='details'>
                                    <Table.Td colSpan={5}>
                                        {configuration.fields.map((field) => (
                                            <TextInput label={`${capitalizeFirstLetter(field.name)}`}
                                                type={field.type}
                                                onChange={(e) => handleFieldInputChanged(field.name, e.target.value)}
                                            />
                                        ))}
                                    </Table.Td>
                                </Table.Tr>
                                {configuration.unit === 'manual' &&
                                    <Table.Tr key='unit-input'>
                                        <Table.Td colSpan={5}>
                                            <TextInput label="Unit" type='text'
                                                onChange={(e) => setUnit(e.target.value)}
                                            />
                                        </Table.Td>
                                    </Table.Tr>
                                }
                            </>
                        }
                    </>
                ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default SelectHardwareConfiguration;
