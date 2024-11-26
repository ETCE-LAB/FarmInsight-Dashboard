import React, {useEffect, useState} from "react";
import {Box, Button, Grid, NumberInput, Switch, TextInput} from "@mantine/core";
import {useAuth} from "react-oidc-context";
import {Fpf} from "../../fpf/models/Fpf";
import {Sensor} from "../models/Sensor";
import {addSensor} from "../useCase/addSensor";
import {HardwareConfiguration} from "../../hardwareConfiguration/models/HardwareConfiguration";

export const SensorForm:React.FC<{fpfID:string, toEditSensor?:Sensor}> = ({fpfID, toEditSensor}) => {
    const auth = useAuth();
    const [name, setName] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const [modelNr, setModelNr] = useState<string>("")
    const [isActive, setIsActive] = useState<boolean>(false)
    const [intervalSeconds, setIntervalSeconds] = useState<string | number>(0)
    const [location, setLocation] = useState<string>("")
    const [hardwareConfig, setHardwareConfig] = useState<HardwareConfiguration>()


    /*
    {
  "name": "string",
  "location": "string",
  "unit": "°C",
  "modelNr": "string",
  "isActive": true,
  "intervalSeconds": 0,
  "hardwareConfiguration": {
    "sensorClassId": "string",
    "additionalInformation": {}
  },
  "fpfId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
    */

    const handleSave = () => {
        //addSensor({name, location, unit, modelNr, isActive, intervalSeconds, hardwareConfig, fpfID:fpf.id})
        console.log("Abfahrt Sensor")
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
                                <Switch label="Is Active?" size="md" />
                            </Grid.Col>
                            {/*HardwareConfiguration*/}


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

