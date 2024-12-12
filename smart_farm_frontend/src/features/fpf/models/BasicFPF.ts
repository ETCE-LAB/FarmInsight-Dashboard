import {Sensor} from "../../sensor/models/Sensor";
import {Camera} from "../../camera/models/camera";

interface BasicOrganization{
    id:string,
    name:string,
    isPublic:boolean
}

export interface BasicFPF {
    id:string,
    name:string
    organization:BasicOrganization,
    lastImageUrl:string,
    sensors: Sensor[],
}