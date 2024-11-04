import {Sensor} from "../../sensor/models/Sensor";
import {Camera} from "../../camera/models/camera";


export interface Fpf {
    id:number,
    name:string
    isPublic:boolean,
    sensorServiceIp:string,
    cameraServiceIp:string
    address:string,
    Sensors: Sensor[],
    Cameras: Camera[]
}