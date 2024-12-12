import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import placeholderImage from "../../../placeholder.png";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import {Container, Flex, Box, Image, Grid, SimpleGrid} from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";
import {getAllImages} from "../../measurements/useCase/getAllImages";
import useWebSocket from "react-use-websocket"
import {getWebSocketToken} from "../../../utils/WebSocket/getWebSocketToken";

export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();
    const growingCylceEventListener = useSelector((state: RootState) => state.growingCycle.changeGrowingCycleEvent);
    const [images, setImages] = useState<[{url:string, measuredAt:string}] |null>(null)
    const params = useParams();


    useEffect(() => {
        if (params?.fpfId) {
            getFpf(params.fpfId).then(resp => {
                setFpf(resp);

            });
        }
    }, [params, growingCylceEventListener]);

    useEffect( () => {
        if(fpf?.Cameras[0]) {
            getAllImages(fpf?.Cameras[0].id).then( resp => {
                setImages(resp)
            })
        }
        else setImages(null)
    },[fpf])


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
                    <Box style={{ width: 'auto', display: 'flex', flexDirection: 'column', height:'85vh'}}>
                        <Box style={{  marginBottom: '20px' }}>
                            {/* Camera feed placeholder */}
                            {images?.length && images.length > 0 && (
                            <Image src={images[0].url} alt="Last Received Image" style={{ width: '100%', height: 'auto' }} />
                                )}
                            {fpf &&
                                <GrowingCycleList fpfId={fpf.id} growingCycles={fpf.GrowingCycles} />
                            }
                        </Box>
                    </Box>

            </SimpleGrid>
        </Container>
    );
};
