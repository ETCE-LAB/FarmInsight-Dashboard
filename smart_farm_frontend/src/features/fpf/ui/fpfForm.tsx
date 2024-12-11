import React, {useEffect, useState} from 'react';
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
import {getAvailableHardwareConfiguration} from "../../hardwareConfiguration/useCase/getAvailableHardwareConfiguration";
import { useTranslation } from 'react-i18next';



export const FpfForm: React.FC<{inputOrganization?:Organization, toEditFpf?:Fpf}> = ({ inputOrganization, toEditFpf }) => {
    const auth = useAuth();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [sensorServiceIp, setSensorServiceIp] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState<{ sensorServiceIp?: string; cameraServiceIp?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(toEditFpf){
            setName(toEditFpf.name)
            setIsPublic(toEditFpf.isPublic)
            setSensorServiceIp(toEditFpf.sensorServiceIp)
            setAddress(toEditFpf.address)
        }
    }, [toEditFpf]);


    const validateIps = () => {
        const newErrors: { sensorServiceIp?: string; cameraServiceIp?: string } = {};

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateIps() && inputOrganization) {
            const organizationId = inputOrganization.id
            createFpf({name, isPublic, sensorServiceIp, address, organizationId }).then(fpf =>
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
                    {t("header.loginToManage")}
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
                            <TextInput label={t("header.name")}
                                       placeholder={t("header.enterName")}
                                       required
                                       value={name}
                                       onChange={(e) => setName(e.currentTarget.value)}/>
                        </Grid.Col>

                        {/* Address Input */}
                        <Grid.Col span={6}>
                            <TextInput label={t("header.address")}
                                       placeholder={t("header.enterAddress")}
                                       value={address}
                                       onChange={(e) => setAddress(e.currentTarget.value)}/>
                        </Grid.Col>

                        {/* SensorServiceIP Input */}
                        <Grid.Col span={6}>
                            <TextInput
                                label="FPF Backend IP/URL"
                                placeholder="Enter IP or URL"
                                required
                                value={sensorServiceIp}
                                onChange={(e) => setSensorServiceIp(e.currentTarget.value)}
                                error={errors.sensorServiceIp}/>
                        </Grid.Col>

                        {/* Is Public Toggle */}
                        <Grid.Col span={12}
                                  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Switch label={t("label.setPublic")} size="md"/>
                        </Grid.Col>

                        <Grid.Col span={12}>
                            {inputOrganization &&
                                <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
                                    <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                                        {t("button.add")}
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