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


export const CameraForm:React.FC<{toEditCamera?:EditCamera}> = ({toEditCamera}) => {
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
                console.dir(camera);
            });
        }
    };

    const handleSave = () => {
        if (fpfId && organizationId) {
            createCamera({fpfId, id:"", name, location, modelNr, resolution, isActive,  intervalSeconds, livestreamUrl, snapshotUrl}).then((camera) => {
                dispatch(createdCamera())
                navigate(AppRoutes.editFpf.replace(":organizationId", organizationId).replace(":fpfId", fpfId));
            })
        }
    }

    return (
        <>
            {!auth.isAuthenticated ? (
                <Button onClick={() => auth.signinRedirect()} variant="filled" color="#105385" style={{ margin: '10px' }}>
                    Login to manage Facility
                </Button>
            ) : (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    toEditCamera ? handleEdit() : handleSave();
                }}>
                    <Grid gutter="md">
                        {/*Name*/}
                        <Grid.Col span={6}>
                            <TextInput  label="Name"
                                        placeholder="Enter name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        {/*Location*/}
                        <Grid.Col span={6}>
                            <TextInput  label="Location"
                                        placeholder="Enter Location"
                                        required
                                        value={location}
                                        onChange={(e) => setLocation(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label="Model Nr."
                                        placeholder="Enter Model Nr."
                                        required
                                        value={modelNr}
                                        onChange={(e) => setModelNr(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput  label="Interval in Seconds"
                                          placeholder="Enter Interval in Seconds"
                                          required
                                          value={intervalSeconds}
                                          onChange={(value) => setIntervalSeconds(value as number ?? 1)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label="Resolution"
                                          placeholder="Enter Resolution"
                                          required
                                          value={resolution}
                                          onChange={(e) => setResolution(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label="Livestream URL"
                                          placeholder="Enter Livestream URL"
                                          required
                                          value={livestreamUrl}
                                          onChange={(e) => setLivestreamUrl(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput  label="Snapshot URL"
                                          placeholder="Enter Snapshot URL"
                                          required
                                          value={snapshotUrl}
                                          onChange={(e) => setSnapshotUrl(e.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}
                                  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Switch label="Is Active?" size="md" checked={isActive} onChange={() => setIsActive(!isActive)} />
                        </Grid.Col>
                        {/*Add Button*/}
                        <Grid.Col span={12}>
                            <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
                                <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                                    {toEditCamera?.id ? "Save Changes" : "Add Camera"}
                                </Button>
                            </Box>
                        </Grid.Col>

                    </Grid>
                </form>
            )}
        </>
    )
}

