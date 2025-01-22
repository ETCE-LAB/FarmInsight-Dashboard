import React, {useEffect, useRef, useState} from "react";
import {Camera, EditCamera} from "../models/camera";
import {useParams} from "react-router-dom";
import { Carousel } from '@mantine/carousel';
import {getImages} from "../useCase/getImages";
import {Box, Card, Center, Image, Switch, Title, Text} from '@mantine/core';
import {useAuth} from "react-oidc-context";
import {Livestream} from "./Livestream";
import NoCameraPlaceholder from './NoCameraPlaceholder.png';
import {IconCamera, IconVideo, IconVideoOff} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";

export interface displayObject {
    url:string,
    title:string,
    isLiveStream:boolean
}

export const CameraCarousel: React.FC<{ camerasToDisplay: Camera[] }> = ({camerasToDisplay}) => {
    const {organizationId, fpfId} = useParams();
    const [objectsToDisplay, setObjectsToDisplay] = useState<displayObject[]>([]);
   // const [slides, setSlides] = useState<JSX.Element[]| null>();
    const [showLivestream, setShowLivestream] = useState<boolean >(false)
    const auth = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        setObjectsToDisplay([])

        if(camerasToDisplay.length > 0){
            //Reset/Clear current List
            //For each Camera add all Images and Livestreams as objectsToDisplay
            camerasToDisplay.map((camera) => {
                //If the camera has a SnapShot URL
                if(camera.isActive){
                    console.log(auth)

                    if(showLivestream)
                    {
                        setObjectsToDisplay((prevObjects) => [
                            ...prevObjects,
                            { url: `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${camera.id}/livestream`, title: `${camera.name} LiveStream`, isLiveStream: true },
                        ]);

                    }
                    else {
                        getImages(camera.id).then(resp => {
                            if (resp && resp.length > 0) {

                                for (let i = 0; i < resp.length; i++) {
                                    setObjectsToDisplay((prevObjects) => [
                                        ...prevObjects,
                                        {url: resp[i].url, title: `${camera.name}`, isLiveStream: false},
                                    ]);
                                }
                            }
                        })
                    }
                }
            })
        }
    }, [fpfId, camerasToDisplay, showLivestream]);

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
        <>
         <Card
            padding="md"
            radius="md"
            style={{position: "static", marginBottom: "30px"}}
            >
             {auth.isAuthenticated && (
                 <>
                     <Box
                         style={{
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             marginBottom: '10px'
                         }}
                     >
                         <Text size="sm" fw={500} style={{ marginBottom: '5px' }}>
                             {t("label.setCameraCarousel")}
                         </Text>
                         <Switch
                             offLabel={<IconCamera size={16} />}
                             onLabel={<IconVideo size={16} />}
                             size="md"
                             onChange={(e) => setShowLivestream(e.currentTarget.checked)}
                         />
                     </Box>
                 </>
             )}
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
        </>
        )
}