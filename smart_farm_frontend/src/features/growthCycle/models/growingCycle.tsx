import {HarvestEntity} from "../../harvestEntity/models/harvestEntity";

export interface GrowingCycle{
    id:string;
    fpfId:string;
    startDate:Date;
    endDate:Date;
    plants:string;
    note:string;
    harvests:HarvestEntity[]
}