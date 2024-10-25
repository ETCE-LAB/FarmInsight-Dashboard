import React,{ useState } from 'react';
import { Group, Menu, Button } from '@mantine/core';
import {LoginButton} from "./loginButton";
import {LogoutButton} from "./logoutButton";
import {useAuth} from "react-oidc-context";

const Header = () => {
    const [opened, setOpened] = useState(false);
    const auth = useAuth();

    return (
        <header style={styles.header}>
            <Group>
                <Menu
                    opened={opened}
                    onOpen={() => setOpened(true)}
                    onClose={() => setOpened(false)}
                    trigger="click"
                    openDelay={200}
                >
                    <Menu.Target>
                        <Button variant="light" color="green">My Organizations</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => alert('Button 1 clicked')}>Organization 1</Menu.Item>
                        <Menu.Item onClick={() => alert('Button 2 clicked')}>Organization 2</Menu.Item>
                        <Menu.Item onClick={() => alert('Button 3 clicked')}>Organization 3</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
            <Group>
                {!auth.isAuthenticated ? <LoginButton /> : <LogoutButton/>}
            </Group>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#3cf123',
        borderBottom: '1px solid #ddd',
    },
};

export default Header;