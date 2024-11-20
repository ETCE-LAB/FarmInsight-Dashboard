import {Membership} from "../../membership/models/membership"

export interface Organization{
    id:string
    name:string
    isPublic:boolean
    memberships:Membership[]
}