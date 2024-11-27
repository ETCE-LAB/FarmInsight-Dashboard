import React, { useState, useEffect } from "react";
import { Table, ScrollArea, TextInput, Button, Collapse, Paper } from "@mantine/core";
import {HardwareConfiguration} from "../models/HardwareConfiguration";
import {getAvailableHardwareConfiguration} from "../useCase/getAvailableHardwareConfiguration";
import {useParams} from "react-router-dom";

const SelectHardwareConfiguration = () => {
    const [hardwareConfiguration, setHardwareConfiguration] = useState<HardwareConfiguration[]>([]);
    const [expandedRow, setExpandedRow] = useState<string | number | null>(null);
    const [additionalInfo, setAdditionalInfo] = useState({});

    const { organizationId, fpfId } = useParams();

    // Beispiel-Daten holen (ersetze mit deinem API-Call)
    useEffect(() => {
        if(fpfId) {
            getAvailableHardwareConfiguration(fpfId).then(resp => {
                console.log(resp)
                    setHardwareConfiguration(resp)
                }
            )
        }
    }, [fpfId]);

    // Handler für zusätzliche Informationen
    const handleAdditionalInfoChange = (id: string, field: string, value: string | number | boolean) => {
        setAdditionalInfo((prev) => ({

        }));
    };

    // Zeile auswählen und aufklappen
    const handleRowClick = (id: string | number) => {
        setExpandedRow((prev: string | number | null) => (prev === id ? null : id)); // Toggle
    };


    // Daten speichern
    const handleSave = () => {
        console.log("Additional Information:", additionalInfo);
        // Hier könntest du die Informationen per API absenden
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
                {hardwareConfiguration.map((row,index) => (
                    <React.Fragment key={`${row.sensorClassID}`}>
                        {/* Hauptzeile */}
                        <Table.Tr key={`${row.sensorClassID}-main`} onClick={() => handleRowClick(row.sensorClassID)} style={{ cursor: "pointer" }}>
                            <Table.Td>{row.name}</Table.Td>
                            <Table.Td>{row.connection}</Table.Td>
                            <Table.Td>{row.parameter}</Table.Td>
                            <Table.Td>{row.tags.info}</Table.Td>
                        </Table.Tr>

                        {/* Ausklappbarer Bereich */}
                        <Table.Tr key={`${row.sensorClassID}-details`}>
                            <Table.Td colSpan={4}>
                                <Collapse in={expandedRow === row.sensorClassID}>
                                    <Paper p="md" shadow="sm" style={{ marginTop: "10px" }}>
                                        <h4>Additional Information for {row.name}</h4>
                                        <TextInput
                                            label="Additional Details"
                                            placeholder="Enter details"
                                            value= "" //{additionalInfo[row.sensorClassID]?.details ||}
                                            onChange={(e) => handleAdditionalInfoChange(row.sensorClassID, "details", e.target.value)}
                                            style={{ marginBottom: "10px" }}
                                        />
                                        <Button variant="outline" onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Paper>
                                </Collapse>
                            </Table.Td>
                        </Table.Tr>
                    </React.Fragment>
                ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default SelectHardwareConfiguration;
