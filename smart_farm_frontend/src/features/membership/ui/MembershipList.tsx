import {Button, Table} from "@mantine/core";
import React, {useContext, useEffect, useState} from "react";
import {receiveUserProfile} from "../../userProfile/useCase/receiveUserProfile";
import {Membership} from "../models/membership";
import {PromoteMembershipButton} from "./PromoteMembershipButton";
import {KickMemberButton} from "./KickMemberButton";


export  const MembershipList: React.FC<{members:Membership[]}> = ( {members} ) => {
    const [memberList, setMembers] = useState<Membership[] >(members);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        receiveUserProfile().then( (user) => {
            const userIsAdmin = members.some(
                (member) => member.userprofile.id === user.id && member.membershipRole === "admin"
            );
            setIsAdmin(userIsAdmin);
            }
        )
    }, [members]);


    return (
        <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <th style={{ textAlign: "left"}}>Name</th>
                    <th style={{ textAlign: "left"}}>Email</th>
                    <th style={{ textAlign: "center"}}>Role</th>
                    <th style={{ textAlign: "center"}}>Promote</th>
                    <th style={{ textAlign: "center"}}>Kick</th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {members.map((member : Membership ) => (
                    <Table.Tr key={member.id}>
                        <Table.Td style={{ textAlign: "left"}}>{member.userprofile.name}</Table.Td>
                        <Table.Td style={{ textAlign: "left"}}>{member.userprofile.email}</Table.Td>
                        <Table.Td style={{ textAlign: "center"}} >{member.membershipRole}</Table.Td>
                        <Table.Td style={{ textAlign: "center"}}>
                            { isAdmin && member.membershipRole != "admin" && (

                                <PromoteMembershipButton member={member}/>
                            )}
                        </Table.Td>
                        <Table.Td style={{ textAlign: "center"}}>
                            { isAdmin && member.membershipRole != "admin" && (
                                <KickMemberButton id={member.id}/>
                            )}
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};