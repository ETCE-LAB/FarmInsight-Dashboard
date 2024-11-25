import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../../features/measurements/ui/timeseriesGraph";
import placeholderImage from "../../../placeholder.png";
import { Sensor } from "../../../features/sensor/models/Sensor";
import { useLocation } from "react-router-dom";
import { Fpf } from "../../../features/fpf/models/Fpf";
import { getFpf } from "../../../features/fpf/useCase/getFpf";
import { Container, Flex, Box, Image } from '@mantine/core';

export const MainFrame = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [fpf, setFpf] = useState<Fpf>();

    const { id } = useLocation().state;

    useEffect(() => {
        console.log(id);
        getFpf(id).then(resp => {
            setFpf(resp);
            console.log(resp);
        });
    }, [id]);

    return (
        <Container style={{ display: 'flex', height: 'auto', width: '100vw' }}>
            <Flex style={{ flexGrow: 1, padding: '20px', flexDirection: 'column' }}>
                <Flex style={{ flexGrow: 1 }}>
                    <Box style={{ flex: 1, marginRight: '20px', overflowY: "scroll", maxHeight: "85vh", maxWidth: "50vw" }}>
                        {fpf && fpf.Sensors.map((sensor) => (
                            <Box key={sensor.id}>
                                <TimeseriesGraph sensor={sensor} />
                            </Box>
                        ))}
                    </Box>
                    <Box style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                        <Box style={{ height: 'auto', marginBottom: '20px' }}>
                            {/* Camera feed placeholder */}
                            <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Container>
    );
};
