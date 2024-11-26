import React, { useState } from 'react';
import {Button, TextInput, Checkbox, Box, Switch, Card, Grid, Title, ActionIcon} from "@mantine/core";
import { useAuth } from "react-oidc-context";
import {createFpf} from "../useCase/createFpf";
import {Organization} from "../../organization/models/Organization";
import {useDispatch} from "react-redux";
import {AppRoutes} from "../../../utils/appRoutes";
import {createdFpf} from "../state/FpfSlice";
import {useNavigate} from "react-router-dom";
import {Fpf} from "../models/Fpf";
import {IconTrash} from "@tabler/icons-react";


export const FpfForm: React.FC<{inputOrganization?:Organization, toEditFpf?:Fpf}> = ({ inputOrganization, toEditFpf }) => {
    const auth = useAuth();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [sensorServiceIp, setSensorServiceIp] = useState("");
    const [cameraServiceIp, setCameraServiceIp] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState<{ sensorServiceIp?: string; cameraServiceIp?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/;

    const validateIps = () => {
        const newErrors: { sensorServiceIp?: string; cameraServiceIp?: string } = {};

        if (!ipv4Regex.test(sensorServiceIp)) {
            newErrors.sensorServiceIp = "Invalid IPv4 address";
        }

        if (!ipv4Regex.test(cameraServiceIp)) {
            newErrors.cameraServiceIp = "Invalid IPv4 address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateIps() && inputOrganization) {
            const organizationId = inputOrganization.id
            createFpf({name, isPublic, sensorServiceIp, cameraServiceIp, address, organizationId }).then(fpf =>
            {
                dispatch(createdFpf());
                if (fpf)
                    navigate(AppRoutes.editFpf.replace(":organizationId", organizationId).replace(":fpfId", fpf.id));
            }
            )
        }
    };

    return (
        <>
            {!auth.isAuthenticated ? (
                <Button onClick={() => auth.signinRedirect()} variant="filled" color="#105385" style={{ margin: '10px' }}>
                    Login to manage Facility
                </Button>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <Grid gutter="md">
                        {/* Title */}
                        <Grid.Col span={12}
                                  style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                {toEditFpf &&
                                    <ActionIcon size="lg" color="red" variant="transparent">
                                        <IconTrash/>
                                    </ActionIcon>
                                }
                        </Grid.Col>

                        {/* Name Input */}
                        <Grid.Col span={6}>
                            <TextInput label="Name" placeholder="Enter name" required/>
                        </Grid.Col>

                        {/* Address Input */}
                        <Grid.Col span={6}>
                            <TextInput label="Address" placeholder="Enter address (optional)"/>
                        </Grid.Col>

                        {/* SensorServiceIP Input */}
                        <Grid.Col span={6}>
                            <TextInput label="SensorServiceIP" placeholder="Enter SensorServiceIP" required/>
                        </Grid.Col>

                        {/* CameraServiceIP Input */}
                        <Grid.Col span={6}>
                            <TextInput label="CameraServiceIP" placeholder="Enter CameraServiceIP"/>
                        </Grid.Col>

                        {/* Is Public Toggle */}
                        <Grid.Col span={12}
                                  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Switch label="Is Public?" size="md"/>
                        </Grid.Col>

                         <Grid.Col span={12}>
                             {inputOrganization &&
                                 <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
                                     <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                                         Create Facility
                                     </Button>
                                 </Box>
                             }
                        </Grid.Col>

                    </Grid>
                </form>
            )

            }
        </>
    )
}