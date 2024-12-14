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
import {CameraList} from "../../camera/ui/CameraList";
import {Camera} from "../../camera/models/camera";


export const EditFPF: React.FC = () => {
    const { organizationId, fpfId } = useParams();
    const [organization, setOrganization] = useState<Organization>()
    const [fpf, setFpf] = useState<Fpf>({id:"0", name:"", isPublic:true, Sensors:[], Cameras:[], sensorServiceIp:"", address:"", GrowingCycles:[]});
    const [sensors, setSensor] = useState<Sensor[]>()
    const [cameras, setCamera] = useState<Camera[]>()

    const SensorEventListener = useSelector((state: RootState) => state.sensor.receivedSensorEvent);
    const CameraEventListener = useSelector((state: RootState) => state.camera.createdCameraEvent);


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



    useEffect(() => {
        if(fpfId){
            getFpf(fpfId).then((resp) => {
                setSensor(resp.Sensors)
            })
        }
    }, [SensorEventListener]);

    useEffect(() => {
        if(fpfId){
            getFpf(fpfId).then((resp) => {
                setCamera(resp.Cameras)
            })
        }
    }, [CameraEventListener]);


    const togglePublic = () => {
        setFpf((prevFpf) => ({ ...prevFpf, isPublic: !prevFpf.isPublic }));
    };

    return (
        <Stack gap={"md"}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <FpfForm toEditFpf={fpf}/>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder >
                <SensorList sensorsToDisplay={sensors} fpfId={fpf.id}/>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder >
                <CameraList camerasToDisplay={cameras}/>
            </Card>
        </Stack>
    );
};
