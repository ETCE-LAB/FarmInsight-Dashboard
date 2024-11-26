import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import placeholderImage from "../../../placeholder.png";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import { Container, Flex, Box, Image } from '@mantine/core';

export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();

    const params = useParams();

    useEffect(() => {
        if (params?.fpfId) {
            getFpf(params.fpfId).then(resp => { setFpf(resp); });
        }
    }, [params]);

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
