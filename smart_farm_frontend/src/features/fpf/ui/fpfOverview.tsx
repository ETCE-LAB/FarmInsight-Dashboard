import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import {Container, Box, SimpleGrid, Notification, Divider} from '@mantine/core';
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
    const [isCameraActive, setCameraActive] = useState(false)
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
            if(fpf?.Cameras && fpf.Cameras.length > 0) {

            }

        }
    }, [params]);

    useEffect( () => {
        if(fpf) {
            if (fpf.Cameras) {
                fpf.Cameras.map(camera => {
                    console.log(fpf.Cameras)
                    console.log(camera)
                    if (camera.isActive && !isCameraActive) {
                        setCameraActive(true)
                    }
                })
            }
        }
    },[fpf])

    return (
        <Container fluid style={{ width: '100%', height: '100%' }}>
            {isFirefox && (
                <Notification mb='1em' color="red" withCloseButton={false}>
                    {t('error.fireFoxError')}
                </Notification>
            )}
            <SimpleGrid
                cols={2}
                spacing="lg"
                style={{ height: '85vh', overflow: 'hidden' }}
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
                        scrollBehavior: 'smooth',
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
                        scrollBehavior: 'smooth',
                    }}
                >
                    {fpf && fpf.Cameras.length > 0 && isCameraActive && (
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
