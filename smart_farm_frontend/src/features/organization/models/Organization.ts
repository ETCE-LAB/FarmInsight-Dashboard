import {Fpf} from "../../fpf/models/Fpf";

import {Membership} from "../../membership/models/membership"

export interface Organization{
    id:string
    name:string
    isPublic:boolean
    FPFs:Fpf[]
    memberships:Membership[]
}