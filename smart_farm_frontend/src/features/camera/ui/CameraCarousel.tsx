import React, {useEffect} from "react";
import {Camera, EditCamera} from "../models/camera";
import {useParams} from "react-router-dom";
import { Carousel } from '@mantine/carousel';


export const CameraCarousel:React.FC<{camerasToDisplay:Camera[] | undefined}> = (camerasToDisplay) => {
    const { organizationId, fpfId } = useParams();



    useEffect(() => {

    }, []);


    return (
        <Carousel withIndicators height={200}>
            <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Slide>3</Carousel.Slide>
            {/* ...other slides */}
        </Carousel>
    )
}
