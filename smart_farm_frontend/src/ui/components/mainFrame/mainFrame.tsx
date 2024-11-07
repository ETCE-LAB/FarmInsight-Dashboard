import React, {useState} from 'react';
import {OrganizationForm} from "../../../features/organization/ui/organizationForm";
import {CreateOrganization} from "../../../features/organization/ui/CreateOrganization";
import {FoodProductionFacilityForm} from "../fpfForm";
import {createFpf} from "../../../features/fpf/useCase/createFpf";
import {UserOrganizations} from "../../../features/organization/ui/myOrganizations";
import {TimeseriesGraph} from "../../../features/measurements/ui/timeseriesGraph";
import {useDisclosure} from "@mantine/hooks";
import {Container, Menu, rem, Text, TextInput} from "@mantine/core";
import {IconChevronDown} from "@tabler/icons-react";

export const MainFrame = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState(''); //name for useState searchNameInput?

    //Dropdown menu for organizations
    const tabs = [
        { name: 'My Organizations', color: '#000000', link: './my-organizations', submenu: ['Organization 1', 'Organization 2', 'Organization 3'] },
    ];

    //link in dropdown menu; not necessary i think
    const handleTabClick = (link = '/') => {
        if (link) {
            console.log(link);
        } else {
            console.warn('No link provided for this tab.');
        }
    };

    const items = tabs.map((tab) => (
        <div key={tab.name} style={{ marginBottom: '20px' }}>
            <Menu trigger="hover" openDelay={100} closeDelay={100} withinPortal>
                <Menu.Target>
                    <Text onClick={() => handleTabClick(tab.link)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
        </div>
    ));

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Container size="sm" style={{ backgroundColor: '#ffffff', padding: '20px', height: '100vh', width: '300px', borderRight: '2px solid #8d9395' }}>
                {items}
                <TextInput style={{ backgroundColor: '#ffffff', color: '#000000' }} value={value} onChange={(event) => setValue(event.currentTarget.value)}/>
            </Container>
            <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
                <OrganizationForm onSave={async (data) => {
                    console.log('saving', data);
                    await CreateOrganization();
                }} />
                <FoodProductionFacilityForm organization={'test123'} onSave={async (data) => {
                    console.log('saving', data);
                    await createFpf(data);
                }} />
                <UserOrganizations />
                <TimeseriesGraph />
            </div>
        </div>
    );
};
