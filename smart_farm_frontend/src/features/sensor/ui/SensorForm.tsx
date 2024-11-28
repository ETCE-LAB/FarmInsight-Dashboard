import React, {useEffect, useState} from "react";
import {Box, Button, Grid, NumberInput, Switch, TextInput} from "@mantine/core";
import {useAuth} from "react-oidc-context";
import {EditSensor} from "../models/Sensor";
import SelectHardwareConfiguration from "../../hardwareConfiguration/ui/SelectHardwareConfiguration";
import {createSensor} from "../useCase/createSensor";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../utils/Hooks";
import {receivedSensor} from "../state/SensorSlice";
import {AppRoutes} from "../../../utils/appRoutes";
import {useNavigate} from "react-router-dom";
import {updateSensor} from "../useCase/updateSensor";

export const SensorForm:React.FC<{toEditSensor?:EditSensor}> = ({toEditSensor}) => {
    const auth = useAuth();
    const { organizationId, fpfId } = useParams();
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [modelNr, setModelNr] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(false)
    const [intervalSeconds, setIntervalSeconds] = useState<number>(0)
    const [location, setLocation] = useState<string>("")

    const navigate = useNavigate();

    const [hardwareConfiguration, setHardwareConfiguration] = useState<{
        sensorClassId: string,
        additionalInformation: Record<string, any>
    }>()




    useEffect(() => {
        if (toEditSensor) {
          setName(toEditSensor.name || "");
          setUnit(toEditSensor.unit || "");
          setModelNr(toEditSensor.modelNr || "");
          setIsActive(toEditSensor.isActive || false);
          setIntervalSeconds(toEditSensor.intervalSeconds || 1);
          setLocation(toEditSensor.location || "");
          setHardwareConfiguration(toEditSensor.hardwareConfiguration || undefined);
        }
    }, [toEditSensor]);

    const handleEdit = () => {
        if (toEditSensor && hardwareConfiguration) {
          updateSensor({
            id:toEditSensor.id,
            name,
            unit,
            location,
            modelNr,
            intervalSeconds,
            isActive,
            fpfId: toEditSensor.fpfId,
            hardwareConfiguration,
          }).then((sensor) => {
            console.dir(sensor);
          });
        }
    };

    const handleSave = () => {
        if (hardwareConfiguration && fpfId && organizationId) {
            const interval = +intervalSeconds;
            createSensor({id:'', name, unit, location, modelNr, intervalSeconds:interval, isActive, fpfId, hardwareConfiguration,}).then((sensor) => {
                dispatch(receivedSensor())
                console.log("Help")
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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            toEditSensor ? handleEdit() : handleSave();
                        }}
                    >
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
                            {/*Unit*/}
                            <Grid.Col span={6}>
                                <TextInput  label="Unit"
                                            placeholder="Enter Unit"
                                            required
                                            value={unit}
                                            onChange={(e) => setUnit(e.currentTarget.value)}
                                />
                            </Grid.Col>
                            {/*model Nr.*/}
                            <Grid.Col span={6}>
                                <TextInput  label="ModelNr"
                                            placeholder="Enter Model Nr."
                                            required
                                            value={modelNr}
                                            onChange={(e) => setModelNr(e.currentTarget.value)}
                                />
                            </Grid.Col>
                            {/*Intervall in S*/}
                            <Grid.Col span={6}>
                                <NumberInput  label="Interval in Seconds"
                                            placeholder="Enter Interval in Seconds"
                                            required
                                            aria-valuemin={1}
                                            value={intervalSeconds}
                                            onChange={(value) => setIntervalSeconds(value as number ?? 1)}
                                />
                            </Grid.Col>
                            {/* Is Active Toggle */}
                            <Grid.Col span={12}
                                      style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Switch label="Is Active?" size="md" checked={isActive} onChange={() => setIsActive(!isActive)} />
                            </Grid.Col>
                            {/*HardwareConfiguration*/}
                            <Grid.Col span={12}>
                                { fpfId && (
                                <SelectHardwareConfiguration fpfId={fpfId} postHardwareConfiguration={setHardwareConfiguration}
                                    selectedConfiguration={
                                        toEditSensor?.hardwareConfiguration
                                            ? {
                                                  sensorClassId: toEditSensor.hardwareConfiguration.sensorClassId,
                                                  additionalInformation: toEditSensor.hardwareConfiguration.additionalInformation,
                                              }
                                            : undefined
                                    }
                                 sensorId={toEditSensor?.id}/>
                                )}
                            </Grid.Col>
                            {/*Add Button*/}
                            <Grid.Col span={12}>

                                    <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
                                <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                                    {toEditSensor?.id ? "Save Changes" : "Add Sensor"}
                                </Button>
                            </Box>

                        </Grid.Col>

                        </Grid>
                    </form>
                )}
            </>
    )
}

