import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import {Container, Box, SimpleGrid, Switch} from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import {CameraCarousel} from "../../camera/ui/CameraCarousel";
import {useAppDispatch} from "../../../utils/Hooks";
import {setGrowingCycles} from "../../growthCycle/state/GrowingCycleSlice";
import {t} from "i18next";


export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();
    const dispatch = useAppDispatch();
    const params = useParams();



    useEffect(() => {
        if (params?.fpfId) {
            getFpf(params.fpfId).then(resp => {
                setFpf(resp);
                dispatch(setGrowingCycles(resp.GrowingCycles));
            });
        }
    }, [params]);


    return (
        <Container fluid style={{ width: '100%', height:'100%', margin: 0}}>
            <SimpleGrid
                type="container"
                cols={2}
                spacing={{ base: 10, '300px': 'xl' }}
              >
                <Box style={{ flex: 1, marginRight: '20px', overflowY: "scroll", scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', height:'85vh', maxWidth: "50vw", width:"100%" }}>
                    {fpf && fpf.Sensors.map((sensor) => (
                        <Box key={sensor.id}>
                            {sensor && (
                                <TimeseriesGraph sensor={sensor} />
                            )}
                        </Box>
                    ))}
                </Box>
                <Box style={{ flex: 1, Width: '50vw', height: 'auto' }}>
                        {/* Camera-Feed */}
                        {fpf && (
                            <>
                                <CameraCarousel camerasToDisplay={fpf.Cameras} />
                            </>
                        )}
                        {fpf &&
                            <GrowingCycleList fpfId={fpf.id} />
                        }
                </Box>
            </SimpleGrid>
        </Container>
    );
};
