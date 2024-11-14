import {useEffect, useState} from "react";
import {Organization} from "../models/Organization";
import {useAppSelector} from "../../../utils/Hooks";
import {createdOrganizationEvent} from "../state/OrganizationSlice";


export const Organizations = () => {
    const [organizations, setOrganizations] = useState<Organization[] | null>(null)
    const organizationCreatedEventListener = useAppSelector(createdOrganizationEvent)
    useEffect(() => {
       // Use case Get organizations, ergebnis rein in set organizations
        let organizationsTemp:Organization[] = [{id:"1", name:"name", isPublic:true}]
        setOrganizations(organizationsTemp)
    }, [organizationCreatedEventListener]);
}