import React, {useState} from 'react';
import {OrganizationForm} from "../../../features/organization/ui/organizationForm";
import {CreateOrganization} from "../../../features/organization/ui/CreateOrganization";
import {FoodProductionFacilityForm} from "../fpfForm";
import {createFpf} from "../../../features/fpf/useCase/createFpf";
import {UserOrganizations} from "../../../features/organization/ui/myOrganizations";
import TimeseriesGraph from "../../../features/measurements/ui/timeseriesGraph";
import {useDisclosure} from "@mantine/hooks";
import {Container, Menu, rem, Text, TextInput} from "@mantine/core";
import {IconChevronDown} from "@tabler/icons-react";
import temperatureData from "../../../temperatureData.json";
import humidityData from "../../../humidityData.json";
import lightData from "../../../lightData.json";
import phLevelData from "../../../phLevelData.json";

export const MainFrame = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState('');

    //Dropdown menu for organizations
    const tabs = [
        { name: 'My Organizations', color: '#000000', link: './my-organizations', submenu: ['Organization 1', 'Organization 2', 'Organization 3'] },
    ];

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
                    <Text onClick={() => handleTabClick(tab.link)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
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
        <div style={{ display: 'flex', height: 'auto', width: '100vw' }}>
            <Container size="sm" style={{ backgroundColor: '#ffffff', padding: '20px', width: '15vw', borderRight: '2px solid #8d9395' }}>
                <div style={{ marginBottom: '20px' }}>
                    {items}
                    <TextInput style={{ backgroundColor: '#000000', color: '#ffffff', marginBottom: '20px' }} value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="Search name" />
                    <Text style={{ display: 'flex', backgroundColor: '#ffffff', padding: '8px 16px', color: '#105385', fontSize: '30px', borderRadius: '6px', border: '1px solid #ffffff' }}>
                        FPF 1
                    </Text>
                </div>
            </Container>
            <div style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <div style={{ flex: 1, marginRight: '20px', overflowY: "scroll", maxHeight: "85vh" }}>
                        <TimeseriesGraph data={temperatureData} title="Temperature" />
                        <TimeseriesGraph data={humidityData} title="Humidity" />
                        <TimeseriesGraph data={lightData} title={"Light"} />
                        <TimeseriesGraph data={phLevelData} title={"PH Level"} />
                    </div>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ backgroundColor: '#f0f0f0', height: '50vh', marginBottom: '20px' }}>
                            {/* Camera feed placeholder */}
                            Camera Feed
                        </div>
                        <OrganizationForm onSave={async (data) => {
                            console.log('saving', data);
                            await CreateOrganization();
                        }} />
                        <FoodProductionFacilityForm organization={'test123'} onSave={async (data) => {
                            console.log('saving', data);
                            await createFpf(data);
                        }} />
                        <UserOrganizations />
                    </div>
                </div>
            </div>
        </div>
    );
};
