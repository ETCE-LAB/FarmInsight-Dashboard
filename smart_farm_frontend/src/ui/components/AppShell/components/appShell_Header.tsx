import React from "react";
import { Card, Flex, Group, Text } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../utils/appRoutes";
import { UserProfileComponent } from "../../../../features/userProfile/ui/UserProfileComponent";
import { LoginButton } from "../../../../features/auth/ui/loginButton";
import { LogoutButton } from "../../../../features/auth/ui/logoutButton";

export const AppShell_Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Group h="100%" px="md" style={{ width: '100%' }}>
            <Flex w="100%" justify="space-between" align="center">
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(AppRoutes.base)}
                >
                    <Card.Section>
                        <Text style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '8px 16px',
                            fontSize: '20px',
                            fontFamily: 'Open Sans, sans-serif',
                            fontWeight: 'bold',
                        }}>
                            FARMINSIGHT
                        </Text>
                    </Card.Section>
                </Card>
                <Group gap="md">
                    <UserProfileComponent />
                    <LoginButton />
                    <LogoutButton />
                </Group>
            </Flex>
        </Group>
    );
};
