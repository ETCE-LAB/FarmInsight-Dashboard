import { Container, Group, Text, Menu, Tabs, rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { LogoutButton } from "./logoutButton";
import { LoginButton } from "./loginButton";
import { UserProfileComponent } from "../../../features/userProfile/ui/UserProfileComponent";

export function Header() {
    return (
        <div style={{ backgroundColor: '#ffffff', padding: '8px 0', borderBottom: '2px solid #8d9395' }}>
            <Container size="md" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ display: 'flex', backgroundColor: '#105385', padding: '8px 16px', color: '#ffffff', borderRadius: '4px' }}>
                    FARM INSIGHT
                </Text>
                <Group>
                    <UserProfileComponent />
                    <LoginButton />
                    <LogoutButton />
                </Group>
            </Container>
        </div>
    );
}