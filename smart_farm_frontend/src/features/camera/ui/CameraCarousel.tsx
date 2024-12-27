import React, {useEffect, useRef, useState} from "react";
import {Camera, EditCamera} from "../models/camera";
import {useParams} from "react-router-dom";
import { Carousel } from '@mantine/carousel';
import {getImages} from "../useCase/getImages";
import {Card, Center, Image, Title} from '@mantine/core';
import {getUser} from "../../../utils/getUser";
import {useAuth} from "react-oidc-context";
import {Livestream} from "./Livestream";
import NoCameraPlaceholder from './NoCameraPlaceholder.png';
import {IconVideoOff} from "@tabler/icons-react";


export interface displayObject {
    url:string,
    title:string,
    isLiveStream:boolean
}


export const CameraCarousel: React.FC<{ camerasToDisplay: Camera[] }> = ({camerasToDisplay}) => {
    const {organizationId, fpfId} = useParams();
    const [objectsToDisplay, setObjectsToDisplay] = useState<displayObject[]>([]);
    const auth = useAuth();

    useEffect(() => {
        setObjectsToDisplay([])

        console.log(camerasToDisplay)

        if(camerasToDisplay.length > 0){
            console.log(fpfId, camerasToDisplay)
            //Reset/Clear current List

            //For each Camera add all Images and Livestreams as objectsToDisplay
            camerasToDisplay.map((camera) => {
                console.log(camera)
                console.log(objectsToDisplay)
                //If the camera has a SnapShot URL
                if(camera.isActive){ // && camera.snapshotUrl.length > 1){
                    getImages(camera.id).then( resp => {
                        if (resp && resp.length > 0) {
                            console.log(resp)
                            setObjectsToDisplay((prevObjects) => [
                                ...prevObjects,
                                { url: `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${camera.id}/livestream`, title: `${camera.name} LiveStream`, isLiveStream: true }
                            ]);
                        }
                    })
                }
                //If the Camera has a Livestream URL
                // Currently not needed as both URLS are required
                /*
                if(camera.isActive){
                    setObjectsToDisplay((prevObjects) => [
                        ...prevObjects,
                        { url: `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${camera.id}/livestream`, isLiveStream: true },
                    ]);
                }
                */

            })
        }
    }, [fpfId, camerasToDisplay]);



    const slides = objectsToDisplay.map((objectToDisplay, index) => (
        <Carousel.Slide key={index}>

            {!objectToDisplay.isLiveStream && (
               <>
                   <Image src={objectToDisplay.url} alt="Last Received Image" fit="contain" />
                   <Title order={6} style={{position: 'absolute', top: '5px', left: '5px'}}> {objectToDisplay.title} </Title>
               </>
            )}
            {auth.isAuthenticated && objectToDisplay.isLiveStream && (
                <Livestream src={objectToDisplay}/>
            )}

        </Carousel.Slide>
    ))

    return (
         <Card
            shadow="sm"
            padding="md"
            radius="md"
            style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)", position: "static", marginBottom: "30px"}}>
             <Center>
                {camerasToDisplay && camerasToDisplay.length > 0 ? (
                    <Carousel withIndicators>
                        {slides}
                    </Carousel>
                ) : (
                    <Center style={{ height: '35vh'}}>
                        <IconVideoOff style={{ margin: 'auto'}} size={50}/>
                    </Center>
                )}
             </Center>
         </Card>
        )
}