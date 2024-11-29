import React, {useEffect, useState} from "react";
import {Fpf} from "../models/Fpf";
import {useParams} from "react-router-dom";
import {getFpf} from "../useCase/getFpf";
import {FpfForm} from "./fpfForm";
import {getOrganization} from "../../organization/useCase/getOrganization";
import {Organization} from "../../organization/models/Organization";
import {Card, Stack} from "@mantine/core";
import {Sensor} from "../../sensor/models/Sensor";
import {SensorList} from "../../sensor/ui/SensorList";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";




export const EditFPF: React.FC = () => {
    const { organizationId, fpfId } = useParams();
    const [organization, setOrganization] = useState<Organization>()
    const [fpf, setFpf] = useState<Fpf>({id:"0", name:"", isPublic:true, Sensors:[], Cameras:[], sensorServiceIp:"", address:""});
    const [sensors, setSensor] = useState<Sensor[]>()

    useEffect(() => {
        if(fpfId) {
            getFpf(fpfId).then(resp => {
                setFpf(resp)
            })
        }
    }, [fpfId]);

    useEffect(() => {
        if(fpf?.Sensors && fpf.Sensors.length >= 1 ){
            setSensor(fpf.Sensors)
        }
    }, [fpf]);

    useEffect(() => {
        if(organizationId){
            getOrganization(organizationId).then(resp => {
                setOrganization(resp)
            })
        }
    }, [organizationId]);

    const SensorEventListener = useSelector((state: RootState) => state.sensor.receivedSensorEvent);

    useEffect(() => {
        if(fpfId){
            getFpf(fpfId).then((resp) => {
                setSensor(resp.Sensors)

            })
        }
    }, [SensorEventListener]);


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
