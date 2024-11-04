import {useEffect, useState} from "react";
import {Organization} from "../models/Organization";
import {useAppSelector} from "../../../utils/Hooks";
import {selectCreatedOrganizationEvent} from "../state/OrganizationSlice";


export const Organizations = () => {
    const [organizations, setOrganizations] = useState<Organization[] | null>(null)
    const organizationCreatedEventListener = useAppSelector(selectCreatedOrganizationEvent)
    useEffect(() => {
       // Use case Get organizations, ergebnis rein in set organizations
        let organizationsTemp:Organization[] = [{id:1, name:"name"}]
        setOrganizations(organizationsTemp)
    }, [organizationCreatedEventListener]);
}