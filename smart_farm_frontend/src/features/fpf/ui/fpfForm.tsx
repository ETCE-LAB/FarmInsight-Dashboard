import React, {useEffect, useState} from 'react';
import {Button, TextInput, Box, Switch, Grid, ActionIcon, Group} from "@mantine/core";
import { useAuth } from "react-oidc-context";
import {createFpf} from "../useCase/createFpf";
import {Organization} from "../../organization/models/Organization";
import {useDispatch} from "react-redux";
import {AppRoutes} from "../../../utils/appRoutes";
import {createdFpf} from "../state/FpfSlice";
import {useNavigate} from "react-router-dom";
import {Fpf} from "../models/Fpf";
import {IconEdit} from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import {updateFpf} from "../useCase/updateFpf";
import {notifications} from "@mantine/notifications";



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
            const id = notifications.show({
                loading: true,
                title: 'Loading',
                message: 'Updating FPF Settings',
                autoClose: false,
                withCloseButton: false,
            });
            const organizationId = inputOrganization.id
            createFpf({name, isPublic, sensorServiceIp, address, organizationId }).then(fpf => {

                if (fpf) {
                    dispatch(createdFpf());
                    navigate(AppRoutes.editFpf.replace(":organizationId", organizationId).replace(":fpfId", fpf.id));
                    notifications.update({
                        id,
                        title: 'Success',
                        message: `FPF updated successfully.`,
                        color: 'green',
                        loading: false,
                        autoClose: 2000,
                    })
                } else {
                    notifications.update({
                        id,
                        title: 'There was an error updating the FPF.',
                        message: `${fpf}`,
                        color: 'red',
                        loading: false,
                        autoClose: 10000,
                    })
                }
            })
        }
    };

    const onClickEdit = () => {
        if(toEditFpf){
            const id = notifications.show({
                loading: true,
                title: 'Loading',
                message: 'Updating FPF',
                autoClose: false,
                withCloseButton: false,
            });

            updateFpf(toEditFpf.id, {name, isPublic, sensorServiceIp, address}).then(fpf => {

                if (fpf)
                {
                    dispatch(createdFpf());
                    notifications.update({
                        id,
                        title: 'Success',
                        message: `FPF updated successfully.`,
                        color: 'green',
                        loading: false,
                        autoClose: 2000,
                    })
                } else {
                    notifications.update({
                        id,
                        title: 'There was an error updating the FPF.',
                        message: `${fpf}`,
                        color: 'red',
                        loading: false,
                        autoClose: 10000,
                    })
                }
            }
            )

        }
    }

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
                        {toEditFpf && (
                                <Grid.Col span={12}
                                          style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                    <Switch label={t("label.setPublic")} size="md" checked={isPublic}/>
                                    <ActionIcon color="blue">
                                        <IconEdit
                                            size={16}
                                            stroke={2}
                                            onClick={() => onClickEdit()}
                                            style={{cursor:"pointer"}}
                                            title={t("fpf.update")}/>
                                    </ActionIcon>
                                </Grid.Col>

                        )}
                        {!toEditFpf && (
                            <Grid.Col span={12}
                                      style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Switch label={t("label.setCameraCarousel")} size="md" checked={isPublic}  onChange={(e) => setIsPublic(e.currentTarget.checked)} />
                            </Grid.Col>
                        )}


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