import {promoteMember} from "../useState/promoteMember";
import {Button} from "@mantine/core";
import React from "react";
import {Membership} from "../models/membership";
import {createdOrganization} from "../../organization/state/OrganizationSlice";
import {useDispatch} from "react-redux";
import {changedMembership} from "../state/MembershipSlice";


export const PromoteMembershipButton:React.FC<{member:Membership}> = ({member}) => {
    const dispatch = useDispatch();

    function handlePromote(id: string, membershipRole:string) {
        console.log(membershipRole)
        promoteMember({id, membershipRole}).then(r =>
            dispatch(changedMembership())
        )
    }
    return (

        <Button onClick={() => handlePromote(member.id, 'admin' )} variant="outline" size="xs" color="blue">
            Promote
        </Button>
    )

}