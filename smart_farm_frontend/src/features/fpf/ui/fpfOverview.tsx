import React, { CSSProperties, useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import {
    Container,
    Box,
    SimpleGrid,
    Button,
    Modal,
    useMantineTheme,
} from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import { GrowingCycleForm } from "../../growthCycle/ui/growingCycleForm";
import { CameraCarousel } from "../../camera/ui/CameraCarousel";
import { useAppDispatch } from "../../../utils/Hooks";
import { setGrowingCycles } from "../../growthCycle/state/GrowingCycleSlice";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlant } from "@tabler/icons-react";
import { useAuth } from 'react-oidc-context';

export const FpfOverview = () => {
    const theme = useMantineTheme();
    const [fpf, setFpf] = useState<Fpf | null>(null);
    const dispatch = useAppDispatch();
    const params = useParams();
    const { t } = useTranslation();
    const [isCameraActive, setCameraActive] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [showGrowingCycleForm, setShowGrowingCycleForm] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        if (params?.fpfId) {
            getFpf(params.fpfId).then(resp => {
                setFpf(resp);
                dispatch(setGrowingCycles(resp.GrowingCycles));
            });
        }
    }, [params, dispatch]);

    useEffect(() => {
        if (fpf?.Cameras?.some(camera => camera.isActive)) {
            setCameraActive(true);
        }
    }, [fpf]);

    // Explicitly type the style object as CSSProperties
    const scrollableStyle: CSSProperties = {
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        WebkitOverflowScrolling: 'touch',
        height: '100%',
        padding: '10px',
        scrollBehavior: 'smooth',
    };

    return (
        <Container fluid style={{ width: '100%', height: '100%' }}>
            {/* Modal for Adding a Growing Cycle */}
            <Modal
                opened={showGrowingCycleForm}
                onClose={() => setShowGrowingCycleForm(false)}
                centered
                title={t("Add Growing Cycle")}
            >
                <GrowingCycleForm
                    fpfId={fpf?.id ?? ""}
                    toEditGrowingCycle={null}
                    closeForm={() => setShowGrowingCycleForm(false)}
                />
            </Modal>
            {isMobile ? (
                // Single scrollable container for mobile devices
                <Box style={{ ...scrollableStyle, height: '88vh' }}>
                    {/* Camera Carousel comes first */}
                    {fpf?.Cameras && fpf.Cameras.length > 0 && isCameraActive && (
                        <Box
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                marginBottom: '32px',
                            }}
                        >
                            <CameraCarousel camerasToDisplay={fpf?.Cameras ?? []} />
                        </Box>
                    )}
                    {/* Sensor graphs come next */}
                    {fpf?.Sensors?.map((sensor) => (
                        <Box
                            key={sensor.id}
                            style={{
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TimeseriesGraph sensor={sensor} />
                        </Box>
                    ))}
                    {/* Growing Cycle Section */}
                    {fpf && (
                        <Box
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                padding: '1rem',
                            }}
                        >
                            {(fpf.GrowingCycles ?? []).length > 0 ? (
                                <GrowingCycleList fpfId={fpf.id} />
                            ) : (
                                <>
                                    {auth.user && (
                                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                variant="light"
                                                leftSection={<IconPlant />}
                                                onClick={() => setShowGrowingCycleForm(true)}
                                                color={theme.colors.blue[6]}
                                            >
                                                {t("growingCycleForm.addCycle")}
                                            </Button>
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            ) : (
                // Desktop layout with two separate scrollable areas
                <SimpleGrid cols={2} spacing="lg" style={{ height: '88vh', overflow: 'hidden' }}>
                    {/* Left section: Sensor Graphs */}
                    <Box style={scrollableStyle}>
                        {fpf?.Sensors?.map((sensor) => (
                            <Box
                                key={sensor.id}
                                style={{
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                }}
                            >
                                <TimeseriesGraph sensor={sensor} />
                            </Box>
                        ))}
                    </Box>

                    {/* Right section: Camera Carousel & Growing Cycle Section */}
                    <Box style={scrollableStyle}>
                        {fpf?.Cameras && fpf.Cameras.length > 0 && isCameraActive && (
                            <Box
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    marginBottom: '32px',
                                }}
                            >
                                <CameraCarousel camerasToDisplay={fpf.Cameras} />
                            </Box>
                        )}
                        {fpf && (
                            <Box
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    padding: '1rem',
                                }}
                            >
                                {(fpf.GrowingCycles ?? []).length > 0 ? (
                                    <GrowingCycleList fpfId={fpf.id} />
                                ) : (
                                    <>
                                        {auth.user && (
                                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button
                                                    variant="light"
                                                    leftSection={<IconPlant />}
                                                    onClick={() => setShowGrowingCycleForm(true)}
                                                    color={theme.colors.blue[6]}
                                                >
                                                    {t("growingCycleForm.addCycle")}
                                                </Button>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>
                </SimpleGrid>
            )}
        </Container>
    );
};
