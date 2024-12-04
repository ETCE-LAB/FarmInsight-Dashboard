import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import placeholderImage from "../../../placeholder.png";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import { Container, Flex, Box, Image } from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";


export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();
    const growingCylceEventListener = useSelector((state: RootState) => state.growingCycle.changeGrowingCycleEvent);
    const params = useParams();

    useEffect(() => {
        if (params?.fpfId) {
            getFpf(params.fpfId).then(resp => {
                setFpf(resp);

            });
        }
    }, [params, growingCylceEventListener]);

    return (
        <Container style={{ display: 'flex', height: 'auto', width: '100vw' }}>
            <Flex style={{ flexGrow: 1, padding: '20px', flexDirection: 'column' }}>
                <Flex style={{ flexGrow: 1 }}>
                    <Box style={{ flex: 1, marginRight: '20px', overflowY: "scroll", maxHeight: "85vh", maxWidth: "50vw" }}>
                        {fpf && fpf.Sensors.map((sensor) => (
                            <Box key={sensor.id}>
                                {sensor && (
                                    <TimeseriesGraph sensor={sensor} />
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <Box style={{ height: 'auto', marginBottom: '20px' }}>
                            {/* Camera feed placeholder */}
                            <Image src={placeholderImage} alt="Placeholder" style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} />
                            {fpf &&
                                <GrowingCycleList fpfId={fpf.id} growingCycles={fpf.GrowingCycles} />
                            }
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Container>
    );
};
