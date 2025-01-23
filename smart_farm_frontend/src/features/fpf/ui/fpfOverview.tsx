import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import {Container, Box, SimpleGrid, Notification} from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import { CameraCarousel } from "../../camera/ui/CameraCarousel";
import { useAppDispatch } from "../../../utils/Hooks";
import { setGrowingCycles } from "../../growthCycle/state/GrowingCycleSlice";
import { useTranslation } from "react-i18next";

export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();
    const dispatch = useAppDispatch();
    const params = useParams();
    const { t } = useTranslation();
    const [isFirefox, setIsFirefox] = useState(true);
    useEffect(() => {
        // Detect if the browser is Firefox
        const userAgent = navigator.userAgent.toLowerCase();
        setIsFirefox(userAgent.includes('firefox'));
    }, []);

    useEffect(() => {
        if (params?.fpfId) {
            getFpf(params.fpfId).then(resp => {
                setFpf(resp);
                dispatch(setGrowingCycles(resp.GrowingCycles));
            });
        }
    }, [params]);

    return (
        <Container fluid style={{ width: '100%', height: '100%' }}>
            {isFirefox && (
                <Notification mb='1em' color="red">
                    {t('error.fireFoxError')}
                </Notification>
            )}
            <SimpleGrid
                cols={2}
                spacing="lg"
                style={{ height: '88vh', overflow: 'hidden' }}
            >
                {/* Scrollable Graph Section */}
                <Box
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        WebkitOverflowScrolling: 'touch',
                        height: '100%',
                        paddingRight: '10px',
                    }}
                >
                    {fpf &&
                        fpf.Sensors.map((sensor) => (
                            <Box key={sensor.id} mb="lg">
                                <TimeseriesGraph sensor={sensor} />
                            </Box>
                        ))
                    }
                </Box>

                {/* Scrollable Camera and Growing Cycle Section */}
                <Box
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        WebkitOverflowScrolling: 'touch',
                        height: '100%',
                        paddingRight: '10px',
                    }}
                >
                    {fpf && fpf.Cameras.length > 0 && (
                        <Box mb="lg">
                            <CameraCarousel camerasToDisplay={fpf.Cameras} />
                        </Box>
                    )}
                    {fpf && <GrowingCycleList fpfId={fpf.id} />}
                </Box>
            </SimpleGrid>
        </Container>
    );
};
