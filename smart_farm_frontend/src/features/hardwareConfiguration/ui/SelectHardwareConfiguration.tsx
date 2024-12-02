import React, {useState, useEffect, useMemo} from "react";
import {Table, ScrollArea, TextInput, Text, HoverCard} from "@mantine/core";
import { HardwareConfiguration} from "../models/HardwareConfiguration";
import {getAvailableHardwareConfiguration} from "../useCase/getAvailableHardwareConfiguration";
import {getSensor} from "../../sensor/useCase/getSensor";

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface SelectHardwareConfigurationProps {
    fpfId: string,
    postHardwareConfiguration(data: { sensorClassId: string, additionalInformation: Record<string, any>}): any,
    sensorId?:string,
    setUnit(data: string): any,
    setModel(data: string): any
}

const SelectHardwareConfiguration:React.FC<SelectHardwareConfigurationProps> = ({fpfId, postHardwareConfiguration, sensorId, setUnit, setModel}) => {
    const [hardwareConfiguration, setHardwareConfiguration] = useState<HardwareConfiguration[]>([]);
    const [selectedSensorClassId, setSelectedSensorClassId] = useState<string|undefined>(undefined);
    const [additionalInformation, setAdditionalInformation] = useState<Record<string, any>>({});

    useEffect(() => {
        getAvailableHardwareConfiguration(fpfId).then((resp) => {
            setHardwareConfiguration(resp);
        });
    }, [fpfId]);

    useEffect(() => {
        if (sensorId && hardwareConfiguration) {
            getSensor(sensorId).then((sensor) => {
                if (sensor) {
                    const matchingConfig = hardwareConfiguration.find(
                        (config) => config.sensorClassId === sensor.hardwareConfiguration.sensorClassId
                    );

                    if (matchingConfig) {
                        postHardwareConfiguration({
                            sensorClassId: sensor.hardwareConfiguration.sensorClassId,
                            additionalInformation: sensor.hardwareConfiguration.additionalInformation,
                        });

                        setSelectedSensorClassId(sensor.hardwareConfiguration.sensorClassId);
                        setAdditionalInformation(sensor.hardwareConfiguration.additionalInformation);
                    } else {
                        console.warn(
                            `No matching hardware configuration found for sensorClassId: ${sensor.hardwareConfiguration.sensorClassId}`
                        );
                    }
                }
            });
        }
    }, [sensorId, hardwareConfiguration, postHardwareConfiguration]);

    const handleSensorClassSelected = (sensorClassId: string) => {
        const config = hardwareConfiguration[hardwareConfiguration.findIndex((x) => x.sensorClassId === sensorClassId)]
        let info: Record<string, any> = {};
        for (const field of config.fields) {
            info[field.name] = undefined;
        }
        setAdditionalInformation(info);
        if (config.unit !== 'manual')
            setUnit(config.unit);
        setModel(config.model);
        postHardwareConfiguration({sensorClassId: sensorClassId, additionalInformation: info});
        setSelectedSensorClassId(sensorClassId);
    }

    const handleFieldInputChanged = (name: string, value: string) => {
        if (selectedSensorClassId) {
            const updatedInfo = {...additionalInformation, [name]: value};
            setAdditionalInformation(updatedInfo);
            postHardwareConfiguration({
                sensorClassId: selectedSensorClassId,
                additionalInformation: updatedInfo,
            });
        }
    };

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
                {additionalInformation && hardwareConfiguration && hardwareConfiguration.map((configuration) => (
                    <>
                        <Table.Tr key={configuration.sensorClassId} onClick={() => handleSensorClassSelected(configuration.sensorClassId)} style={{ cursor: "pointer" }}>
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
                                                       value={additionalInformation[field.name]}
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
