import {useState} from 'react';
import { Container, UnstyledButton, Group, Text, Menu, Tabs, rem } from '@mantine/core';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import {LogoutButton} from "./logoutButton";
import {LoginButton} from "./loginButton";
import classes from './HeaderTabs.module.css';
import {useNavigate} from "react-router-dom";
import {UserProfileComponent} from "../../features/userProfile/ui/UserProfileComponent";


const tabs = [
    { name: 'My Organizations', link: './my-organizations', submenu: ['Organization 1', 'Organization 2', 'Organization 3'] },
];

export function Header_Tabs() {
    const [opened, { toggle }] = useDisclosure(false);
    const [mainMenuOpened, setMainMenuOpened] = useState(false);

    const handleTabClick = (link = '/') => {
        if (link) {
            console.log(link);
        } else {
            console.warn('No link provided for this tab.');
        }
    };

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab.name} key={tab.name}>
            <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={100}
                withinPortal
            >
                <Menu.Target>
                    <Text onClick={() => handleTabClick(tab.link)} style={{ cursor: 'pointer' }}>
                        {tab.name}
                        <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={2} />
                    </Text>
                </Menu.Target>
                <Menu.Dropdown>
                    {tab.submenu.map((option) => (
                        <Menu.Item key={option} onClick={() => alert(`${option} clicked`)}>
                            {option}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Container size="md">
                    <Tabs
                        defaultValue="Home"
                        variant="outline"
                        visibleFrom="sm"
                        classNames={{
                            root: classes.tabs,
                            list: classes.tabsList,
                            tab: classes.tab,
                        }}
                    >
                        <Tabs.List>{items}</Tabs.List>
                    </Tabs>
                </Container>
                <Group justify="flex-end">
                    <UserProfileComponent/>
                    <LoginButton/>
                    <LogoutButton/>
                </Group>
            </Container>
        </div>
    );
}