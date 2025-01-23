import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import { Container, Box, SimpleGrid, Text, Card } from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import { CameraCarousel } from "../../camera/ui/CameraCarousel";
import { useAppDispatch } from "../../../utils/Hooks";
import { setGrowingCycles } from "../../growthCycle/state/GrowingCycleSlice";
import { useTranslation } from "react-i18next";

export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();
    const [isFirefox, setIsFirefox] = useState(false);
    const dispatch = useAppDispatch();
    const params = useParams();
    const { t } = useTranslation();

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
            {isFirefox ? (
                <Card style={{
                    alignItems: "center",
                    height: "88vh",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "default"
                }}>
                    <Text c="red" ta="center" size={"lg"}>
                        {t('error.fireFoxError').split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </Text>
                </Card>
            ) : (
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
                            padding: '10px',
                        }}
                    >
                        {fpf &&
                            fpf.Sensors.map((sensor) => (
                                <Box key={sensor.id} style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px', marginBottom: '20px' }}>
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
                            padding: '10px',
                        }}
                    >
                        {fpf && fpf.Cameras.length > 0 && (
                            <Box style={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}>
                                <CameraCarousel camerasToDisplay={fpf.Cameras} />
                            </Box>
                        )}
                        {fpf && (
                            <Box
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                            <GrowingCycleList fpfId={fpf.id} />
                            </Box>
                        )}
                    </Box>
                </SimpleGrid>
            )}
        </Container>
    );
};
