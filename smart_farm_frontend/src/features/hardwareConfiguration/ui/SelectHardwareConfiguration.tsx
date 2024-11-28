import React, {useState, useEffect, useMemo} from "react";
import {Table, ScrollArea, TextInput, Text, HoverCard} from "@mantine/core";
import { HardwareConfiguration} from "../models/HardwareConfiguration";
import {getAvailableHardwareConfiguration} from "../useCase/getAvailableHardwareConfiguration";
import {getSensor} from "../../sensor/useCase/getSensor";

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const SelectHardwareConfiguration:React.FC<{
    fpfId: string,
    postHardwareConfiguration(data: { sensorClassId: string, additionalInformation: Record<string, any>}): any ,
    selectedConfiguration?: { sensorClassId: string, additionalInformation: Record<string, any>},
    sensorId?:string;
}> = ({fpfId, postHardwareConfiguration, selectedConfiguration, sensorId}) => {

    const [hardwareConfiguration, setHardwareConfiguration] = useState<HardwareConfiguration[]>([]);
    const [currentSelectedConfiguration, setCurrentSelectedConfiguration] = useState<HardwareConfiguration | null>(null);
    const [additionalInformation, setAdditionalInformation] = useState<Record<string, any>>({});

    useEffect(() => {
        getAvailableHardwareConfiguration(fpfId).then((resp) => {
            setHardwareConfiguration(resp);
        });
    }, [fpfId]);

    useEffect(() => {
        // Fetch sensor details and match configuration
        if (sensorId && hardwareConfiguration.length > 0) {
            getSensor(sensorId).then((sensor) => {
                if (sensor) {
                    const matchingConfig = hardwareConfiguration.find(
                        (config) => config.sensorClassId === sensor.hardwareConfiguration.sensorClassId
                    );

                    if (matchingConfig) {
                        const fields = Object.entries(sensor.hardwareConfiguration.additionalInformation).map(
                            ([name, value]) => ({
                                name,
                                type: typeof value,
                                rules: [],
                            })
                        );

                        postHardwareConfiguration({
                            sensorClassId: sensor.hardwareConfiguration.sensorClassId,
                            additionalInformation: sensor.hardwareConfiguration.additionalInformation,
                        });

                        setCurrentSelectedConfiguration({
                            ...matchingConfig,
                            fields,
                        });

                        setAdditionalInformation(sensor.hardwareConfiguration.additionalInformation);
                    } else {
                        console.warn(
                            `No matching hardware configuration found for sensorClassId: ${sensor.hardwareConfiguration.sensorClassId}`
                        );
                    }
                }
            });
        }
    }, [sensorId, hardwareConfiguration]);


    const handleFieldInputChanged = (name: string, value: string) => {
        if (currentSelectedConfiguration) {
            const updatedInfo = { ...additionalInformation, [name]: value };
            setAdditionalInformation(updatedInfo);
            postHardwareConfiguration({
                sensorClassId: currentSelectedConfiguration.sensorClassId,
                additionalInformation: updatedInfo,
            });
        }
    };

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
                    {hardwareConfiguration?.map((configuration) => (
                        <React.Fragment key={configuration.sensorClassId}>
                            {/* Main Row */}
                            <Table.Tr
                                onClick={() => setCurrentSelectedConfiguration(configuration)}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <Table.Td>{configuration.name}</Table.Td>
                                <Table.Td>{configuration.connection}</Table.Td>
                                <Table.Td>{configuration.parameter}</Table.Td>
                                <Table.Td>
                                    {Object.entries(configuration.tags).map(([key, value]) => (
                                        <HoverCard key={key} width={280} shadow="md">
                                            <HoverCard.Target>
                                                <Text>{value}</Text>
                                            </HoverCard.Target>
                                            <HoverCard.Dropdown>
                                                <Text size="sm">{key}</Text>
                                            </HoverCard.Dropdown>
                                        </HoverCard>
                                    ))}
                                </Table.Td>
                            </Table.Tr>

                            {/* Expandable Details Row */}
                            {currentSelectedConfiguration?.sensorClassId === configuration.sensorClassId && (
                                <Table.Tr key={`${configuration.sensorClassId}-details`}>
                                    <Table.Td colSpan={4}>
                                        {configuration.fields.map((field) => (
                                            <TextInput
                                                key={field.name}
                                                label={`${capitalizeFirstLetter(field.name)}`}
                                                type={field.type}
                                                value={additionalInformation[field.name] || ""}
                                                onChange={(e) => handleFieldInputChanged(field.name, e.target.value)}
                                            />
                                        ))}
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default SelectHardwareConfiguration;
