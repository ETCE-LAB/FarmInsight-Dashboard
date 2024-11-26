import React, {useEffect, useState} from "react";
import {Fpf} from "../models/Fpf";
import {useParams} from "react-router-dom";
import {getFpf} from "../useCase/getFpf";
import {FpfForm} from "./fpfForm";
import {getOrganization} from "../../organization/useCase/getOrganization";
import {Organization} from "../../organization/models/Organization";
import {Card} from "@mantine/core";



export const EditFPF: React.FC = () => {
    const { organizationId, fpfId } = useParams();
    const [organization, setOrganization] = useState<Organization>()
    const [fpf, setFpf] = useState<Fpf>({id:"0", name:"", isPublic:true, Sensors:[], Cameras:[], sensorServiceIp:"", address:"", cameraServiceIp:""});

    useEffect(() => {
        if(fpfId) {
            getFpf(fpfId).then(resp => {
                setFpf(resp)
            })
        }
    }, [fpfId]);

    useEffect(() => {
        if(organizationId){
            getOrganization(organizationId).then(resp => {
                setOrganization(resp)
            })
        }
    }, [organizationId]);


    const togglePublic = () => {
        setFpf((prevFpf) => ({ ...prevFpf, isPublic: !prevFpf.isPublic }));
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <FpfForm toEditFpf={fpf}/>
        </Card>
    );
};
