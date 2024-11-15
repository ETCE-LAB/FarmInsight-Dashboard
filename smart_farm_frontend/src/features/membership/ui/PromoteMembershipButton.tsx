import {promoteMember} from "../useState/promoteMember";
import {Button} from "@mantine/core";
import React from "react";
import {Membership} from "../models/membership";


export const PromoteMembershipButton:React.FC<{member:Membership}> = ({member}) => {

    function handlePromote(id: string, membershipRole:string) {
        console.log(membershipRole)
        promoteMember({id, membershipRole}).then(r =>
            console.log(r))
    }
    return (

        <Button onClick={() => handlePromote(member.id, 'admin' )} variant="outline" size="xs" color="blue">
            Promote
        </Button>
    )

}