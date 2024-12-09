import React, { useEffect, useState } from 'react';
import TimeseriesGraph from "../../measurements/ui/timeseriesGraph";
import placeholderImage from "../../camera/ui/NoCameraPlaceholder.png";
import { useParams } from "react-router-dom";
import { Fpf } from "../models/Fpf";
import { getFpf } from "../useCase/getFpf";
import { Container, Flex, Box, Image } from '@mantine/core';
import GrowingCycleList from "../../growthCycle/ui/growingCycleList";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";
import {getAllImages} from "../../measurements/useCase/getAllImages";
import useWebSocket from "react-use-websocket"
import {getWebSocketToken} from "../../../utils/WebSocket/getWebSocketToken";
import {CameraCarousel} from "../../camera/ui/CameraCarousel";

export const FpfOverview = () => {
    const [fpf, setFpf] = useState<Fpf>();
    const growingCylceEventListener = useSelector((state: RootState) => state.growingCycle.changeGrowingCycleEvent);
    const [images, setImages] = useState<{ url: string, measuredAt: string }[]>([]);
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
        else setImages([])
    },[fpf])


    return (
        <Container style={{ display: 'flex', gap:"20px", flexDirection: 'row', maxWidth:"90%"}}>
            {/*TimeseriesGraph*/}
            <Box style={{ flex: 1, overflowY: 'auto', marginRight: '10px' }}>
                {fpf && fpf.Sensors.map((sensor) => (
                    <Box key={sensor.id} style={{display:'flex', align:"right"}}>
                        {sensor && (
                            <TimeseriesGraph sensor={sensor} />
                        )}
                    </Box>
                ))}
            </Box>
            <Box style={{ flex: 1 }}>
                {/* Camera-Feed */}
                {images?.[0]?.url ? (
                    <Image
                        src={images[0].url}
                        alt="Last Received Image"
                        style={{ width: '100%', height: '18vw' }}
                    />
                ) : (
                    <Image
                        src={placeholderImage}
                        alt="No Camera available"
                        style={{ width: '100%', height: '18vw' }}
                    />
                )}
                {/* GrowingCycle */}
                {fpf && (
                    <GrowingCycleList
                        fpfId={fpf.id}
                        growingCycles={fpf.GrowingCycles}
                    />
                )}
            </Box>
        </Container>
    );
};
