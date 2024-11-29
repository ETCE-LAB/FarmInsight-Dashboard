import {Sensor} from "../../sensor/models/Sensor";
import {Camera} from "../../camera/models/camera";


export interface Fpf {
    id:string,
    name:string
    isPublic:boolean,
    sensorServiceIp:string,
    address:string,
    Sensors: Sensor[],
    Cameras: Camera[]
    //TODO: Growing Circle
}