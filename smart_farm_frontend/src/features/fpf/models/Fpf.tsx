import {Sensor} from "../../sensor/models/Sensor";
import {Camera} from "../../camera/models/camera";
import {GrowingCycle} from "../../growthCycle/models/growingCycle";


export interface Fpf {
    id:string,
    name:string
    isPublic:boolean,
    sensorServiceIp:string,
    address:string,
    Sensors: Sensor[],
    Cameras: Camera[]
    GrowingCycles: GrowingCycle[]
}