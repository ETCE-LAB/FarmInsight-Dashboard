import {promoteMember} from "../useState/promoteMember";
import {Button} from "@mantine/core";
import React from "react";
import {kickMember} from "../useState/kickMember";


export const KickMemberButton:React.FC<{id:string}> = ({id}) => {

    function handleKick(id: string) {
        kickMember({id}).then(r =>
            console.log(r))
    }

    return (
        <Button onClick={() => handleKick(id)} variant="outline" size="xs" color="red">
            Kick
        </Button>
    )

}