import {Fpf} from "../../fpf/models/Fpf";

export interface Organization{
    id:string
    name:string
    isPublic:boolean
    FPFs:Fpf[]
}