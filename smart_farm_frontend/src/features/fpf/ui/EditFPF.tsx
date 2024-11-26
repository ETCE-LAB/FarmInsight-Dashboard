import React, {useEffect, useState} from "react";
import {Fpf} from "../models/Fpf";
import {useLocation} from "react-router-dom";
import {getFpf} from "../useCase/getFpf";
import {FpfForm} from "./fpfForm";
import {getOrganization} from "../../organization/useCase/getOrganization";
import {Organization} from "../../organization/models/Organization";
import {Card} from "@mantine/core";



export const EditFPF: React.FC = () => {
    const fpfID = useLocation().state.fpfid
    const organizationID = useLocation().state.organizationId
    const [organization, setOrganization] = useState<Organization>()
    const [fpf, setFpf] = useState<Fpf>({id:"0", name:"", isPublic:true, Sensors:[], Cameras:[], sensorServiceIp:"", address:"", cameraServiceIp:""});

    useEffect(() => {
        if(fpfID) {
            getFpf(fpfID).then(resp => {
                setFpf(resp)
                console.log(resp)
            })
        }
    }, []);

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
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <FpfForm toEditFpf={fpf}/>
        </Card>
    );
};
