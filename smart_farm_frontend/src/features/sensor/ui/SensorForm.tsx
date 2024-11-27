import React, {useState} from "react";
import {Box, Button, Grid, NumberInput, Switch, TextInput} from "@mantine/core";
import {useAuth} from "react-oidc-context";
import {EditSensor} from "../models/Sensor";
import SelectHardwareConfiguration from "../../hardwareConfiguration/ui/SelectHardwareConfiguration";
import {createSensor} from "../useCase/createSensor";

export const SensorForm:React.FC<{fpfId:string, toEditSensor?:EditSensor}> = ({fpfId, toEditSensor}) => {
    const auth = useAuth();
    const [name, setName] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [modelNr, setModelNr] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(false)
    const [intervalSeconds, setIntervalSeconds] = useState<number | string>(0)
    const [location, setLocation] = useState<string>("")
    const [hardwareConfiguration, setHardwareConfiguration] = useState<{ sensorClassId: string, additionalInformation: Record<string, any>}>()

    const handleSave = () => {
        if (hardwareConfiguration) {
            const interval = +intervalSeconds;
            createSensor({id:'', name, unit, location, modelNr, intervalSeconds:interval, isActive, fpfId, hardwareConfiguration,}).then((sensor) => {
                console.dir(sensor)
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
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
                                            value={intervalSeconds}
                                            onChange={setIntervalSeconds}
                                />
                            </Grid.Col>
                            {/* Is Active Toggle */}
                            <Grid.Col span={12}
                                      style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Switch label="Is Active?" size="md" checked={isActive} onChange={() => setIsActive(!isActive)} />
                            </Grid.Col>
                            {/*HardwareConfiguration*/}
                            <Grid.Col span={12}>
                                <SelectHardwareConfiguration fpfId={fpfId} postHardwareConfiguration={setHardwareConfiguration}/>
                            </Grid.Col>
                            {/*Add Button*/}
                            <Grid.Col span={12}>
                                {!toEditSensor  &&
                                    <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
                                <Button type="submit" variant="filled" color="#105385" style={{ margin: '10px' }}>
                                    Add Sensor
                                </Button>
                            </Box>
                            }
                        </Grid.Col>

                        </Grid>


                    </form>
                )}
            </>
    )
}

