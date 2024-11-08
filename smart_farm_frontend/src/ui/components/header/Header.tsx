import {Container, Group, Text, Menu, Tabs, rem, Flex} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { LogoutButton } from "./logoutButton";
import { LoginButton } from "./loginButton";
import { UserProfileComponent } from "../../../features/userProfile/ui/UserProfileComponent";

export function Header() {
    return (
        <div style={{ backgroundColor: '#ffffff', padding: '8px', borderBottom: '2px solid #8d9395', position: "sticky", top: 0, zIndex: 1000 }}>
            <Flex justify={"space-between"} align={"center"} pr={"15px"} pl={"15px"}>
                <Text style={{ display: 'flex', backgroundColor: '#105385', padding: '8px 16px', color: '#ffffff', borderRadius: '4px' }}>
                    FARM INSIGHT
                </Text>
                <Group>
                    <UserProfileComponent />
                    <LoginButton />
                    <LogoutButton />
                </Group>
            </Flex>
        </div>
    );
}