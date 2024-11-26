import React, {useEffect, useState} from "react";
import {Fpf} from "../models/Fpf";
import {useLocation} from "react-router-dom";
import {getFpf} from "../useCase/getFpf";
import {FpfForm} from "./fpfForm";
import {getOrganization} from "../../organization/useCase/getOrganization";
import {Organization} from "../../organization/models/Organization";
import {Card, Stack} from "@mantine/core";
import {Sensor} from "../../sensor/models/Sensor";
import {SensorList} from "../../sensor/ui/SensorList";



export const EditFPF: React.FC = () => {
    const fpfID = useLocation().state.id
    const organizationID = useLocation().state.organizationId
    const [organization, setOrganization] = useState<Organization>()
    const [fpf, setFpf] = useState<Fpf>({id:"0", name:"", isPublic:true, Sensors:[], Cameras:[], sensorServiceIp:"", address:"", cameraServiceIp:""});
    const [sensors, setSensor] = useState<Sensor[]>()

    useEffect(() => {
        if(fpfID) {
            getFpf(fpfID).then(resp => {
                setFpf(resp)
                console.log(resp)
            })
        }
    }, [fpfID]);

    useEffect(() => {
        if(fpf?.Sensors && fpf.Sensors.length >= 1 ){
            console.log(fpf.Sensors)
            setSensor(fpf.Sensors)
            console.log(sensors)
        }
    }, [fpf]);

    useEffect(() => {
        if(organizationID){
            getOrganization(organizationID).then(resp => {
                setOrganization(resp)
            })
        }
    }, [organizationID]);


    const togglePublic = () => {
        setFpf((prevFpf) => ({ ...prevFpf, isPublic: !prevFpf.isPublic }));
    };

    return (
        <Stack gap={"md"}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <FpfForm toEditFpf={fpf}/>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder >
                <SensorList sensorsToDisplay={sensors}/>
            </Card>
        </Stack>
    );
};
