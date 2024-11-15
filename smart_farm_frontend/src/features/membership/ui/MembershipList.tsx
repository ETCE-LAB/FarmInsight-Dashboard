import { UserProfile } from "../../userProfile/models/UserProfile";
import {Button, Table} from "@mantine/core";
import React, {useContext, useEffect, useState} from "react";
import {receiveUserProfile} from "../../userProfile/useCase/receiveUserProfile";
import {Membership} from "../models/membership";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";
import {kickMember} from "../useState/kickMember";
import {promoteMember} from "../useState/promoteMember";
import {PromoteMembershipButton} from "./PromoteMembershipButton";
import {KickMemberButton} from "./KickMemberButton";



export  const MembershipList: React.FC<{members:Membership[]}> = ( {members} ) => {
    const [memberList, setMembers] = useState<Membership[] >(members);
    const [isAdmin, setIsAdmin] = useState(false);
    const membershipEventListener = useSelector((state: RootState) => state.membership.changeMembershipEvent);


    useEffect(() => {
        console.log(members)
        receiveUserProfile().then( (user) => {
            const userIsAdmin = members.some(
                (member) => member.userprofile.id === user.id && member.membershipRole === "admin"
            );
            setIsAdmin(userIsAdmin);
            }
        )
    }, [members, membershipEventListener]);


    const rows = members.map((member:Membership) => (
        <Table.Tr key={member.id}>
            <Table.Td>{member.userprofile.name}</Table.Td>
            <Table.Td>{member.userprofile.email}</Table.Td>
            <Table.Td>{member.membershipRole}</Table.Td>
            <Table.Td>
                { isAdmin && member.membershipRole != "admin" && (

                    <PromoteMembershipButton member={member}/>
                )}
            </Table.Td>
            <Table.Td>
                { isAdmin && member.membershipRole != "admin" && (
                    <KickMemberButton id={member.id}/>
                )}
            </Table.Td>
        </Table.Tr>
    ));





    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>System Role</th>
                    <th>Promote</th>
                    <th>Kick</th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
            </Table.Tbody>
        </Table>
    );
};