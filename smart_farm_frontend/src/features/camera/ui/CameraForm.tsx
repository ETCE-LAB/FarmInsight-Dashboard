import React, {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {useNavigate, useParams} from "react-router-dom";
import {AppRoutes} from "../../../utils/appRoutes";
import {Box, Button, Grid, NumberInput, Switch, TextInput} from "@mantine/core";
import {useAppDispatch} from "../../../utils/Hooks";
import {EditCamera} from "../models/camera";
import {createCamera} from "../useCase/createCamera";
import {updateCamera} from "../useCase/updateCamera";
import {createdCamera} from "../state/CameraSlice";
import {useTranslation} from "react-i18next";
import {notifications} from "@mantine/notifications";


export const CameraForm: React.FC<{ toEditCamera?: EditCamera, setClosed : React.Dispatch<React.SetStateAction<boolean>> }> = ({toEditCamera, setClosed}) => {
    const auth = useAuth();
    const { organizationId, fpfId } = useParams();
    const dispatch = useAppDispatch()

    const [name, setName] = useState<string>("")
    const [modelNr, setModelNr] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(false)
    const [intervalSeconds, setIntervalSeconds] = useState<number>(3600)
    const [location, setLocation] = useState<string>("")
    const [resolution, setResolution] = useState<string>("")
    const [snapshotUrl, setSnapshotUrl] = useState<string>("")
    const [livestreamUrl, setLivestreamUrl] = useState<string>("")
    const { t } = useTranslation();


    const navigate = useNavigate();

    useEffect(() => {
        if (toEditCamera) {
            setName(toEditCamera.name || "");
            setLocation(toEditCamera.location || "");
            setModelNr(toEditCamera.modelNr || "");
            setIsActive(toEditCamera.isActive || false);
            setIntervalSeconds(toEditCamera.intervalSeconds || 1);
            setLocation(toEditCamera.location || "");
            setResolution(toEditCamera.resolution ||"")
            setSnapshotUrl(toEditCamera.snapshotUrl || "")
            setLivestreamUrl(toEditCamera.livestreamUrl)
        }
    }, [toEditCamera]);

    const handleEdit = () => {
        if (toEditCamera && fpfId) {

            const id = notifications.show({
                loading: true,
                title: 'Loading',
                message: 'Updating Sensor on your FPF',
                autoClose: false,
                withCloseButton: false,
            });

            updateCamera({
                fpfId,
                id:toEditCamera.id,
                name,
                location,
                modelNr,
                resolution,
                intervalSeconds,
                snapshotUrl,
                livestreamUrl,
                isActive,
            }).then((camera) => {
                if(camera){
                    setClosed(false)
                    dispatch(createdCamera())
                    console.dir(camera);
                    notifications.update({
                        id,
                        title: 'Success',
                        message: `Camera updated successfully.`,
                        color: 'green',
                        loading: false,
                        autoClose: 2000,
                    });
            }else{
                notifications.update({
                    id,
                    title: 'There was an error updating the camera.',
                    message: `${camera}`,
                    color: 'green',
                    loading: false,
                    autoClose: 2000,
                });
                }

            });
        }
    };

    const handleSave = () => {
        if (fpfId && organizationId) {
            const id = notifications.show({
                loading: true,
                title: 'Loading',
                message: 'Saving Sensor on your FPF',
                autoClose: false,
                withCloseButton: false,
            });
            createCamera({fpfId, id:"", name, location, modelNr, resolution, isActive,  intervalSeconds, livestreamUrl, snapshotUrl}).then((camera) => {
                if(camera){
                dispatch(createdCamera())
                setClosed(false)
                navigate(AppRoutes.editFpf.replace(":organizationId", organizationId).replace(":fpfId", fpfId));
                    notifications.update({
                        id,
                        title: 'Success',
                        message: `Camera saved successfully.`,
                        color: 'green',
                        loading: false,
                        autoClose: 2000,
                    });

                }else{
                    notifications.update({
                        id,
                        title: 'There was an error saving the camera.',
                        message: `${camera}`,
                        color: 'green',
                        loading: false,
                        autoClose: 2000,
                    });

                }
            })
        }
    }


    return (
        <>
            {!auth.isAuthenticated ? (
                <Button onClick={() => auth.signinRedirect()} variant="filled" color="#105385" style={{ margin: '10px' }}>
                    {t("header.loginToManageFpf")}
                </Button>
            ) : (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    toEditCamera ? handleEdit() : handleSave();
                }}>
                    <Grid gutter="md">
                        {/*Name*/}
                        <Grid.Col span={6}>
                            <TextInput  label={t("header.name")}
                                        placeholder={t("header.enterName")}
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        {/*Location*/}
                        <Grid.Col span={6}>
                            <TextInput  label={t("camera.location")}
                                        placeholder={t("header.enterLocation")}
                                        required
                                        value={location}
                                        onChange={(e) => setLocation(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label={t("camera.modelNr")}
                                        placeholder={t("header.enterModelNr")}
                                        required
                                        value={modelNr}
                                        onChange={(e) => setModelNr(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput  label={t("camera.intervalSeconds")}
                                          placeholder={t("header.enterIntervalSeconds")}
                                          required
                                          value={intervalSeconds}
                                          onChange={(value) => setIntervalSeconds(value as number ?? 1)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label={t("camera.resolution")}
                                          placeholder={t("header.enterResolution")}
                                          required
                                          value={resolution}
                                          onChange={(e) => setResolution(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label={t("camera.livestreamUrl")}
                                          placeholder={t("header.enterLivestreamUrl")}
                                          required
                                          value={livestreamUrl}
                                          onChange={(e) => setLivestreamUrl(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label={t("camera.snapshotUrl")}
                                          placeholder={t("header.enterSnapshotUrl")}
                                          required
                                          value={snapshotUrl}
                                          onChange={(e) => setSnapshotUrl(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}
                                  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Switch label={t("header.isActive")} size="md" checked={isActive} onChange={() => setIsActive(!isActive)} />
                        </Grid.Col>
                        {/*Add Button*/}
                        <Grid.Col span={12}>
                            <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
                                <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                                    {toEditCamera?.id ? t("userprofile.saveChanges") : t("camera.addCamera")}
                                </Button>
                            </Box>
                        </Grid.Col>

                    </Grid>
                </form>
            )}
        </>
    )
}

