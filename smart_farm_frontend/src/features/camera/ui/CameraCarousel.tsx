import React, {useEffect, useState} from "react";
import {Camera, EditCamera} from "../models/camera";
import {useParams} from "react-router-dom";
import { Carousel } from '@mantine/carousel';
import {getImages} from "../useCase/getImages";
import {getLivestream} from "../useCase/getLivestream";
import { Image } from '@mantine/core';
import ReactPlayer from 'react-player'

interface displayObject {
    url:string,
    isLiveStream:boolean
}

interface VideoPlayerProps {
    src: string; // Define the type for the `src` prop
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => (
    <video controls style={{ width: '100%', height: '18vw', maxWidth:'50vw' }} >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
);

export const CameraCarousel:React.FC<{camerasToDisplay:Camera[]}> = ({camerasToDisplay}) => {
    const { organizationId, fpfId } = useParams();
    const[objectsToDisplay, setObjectsToDisplay] = useState<displayObject[]>([]);

    useEffect(() => {
        if(camerasToDisplay){
            //Reset/Clear current List
            setObjectsToDisplay([])
            //For each Camera add all Images and Livestreams as objectsToDisplay
            camerasToDisplay.map((camera) => {
                //If the camera has a SnapShot URL
                if(camera.isActive && camera.snapshotUrl.length > 4){
                    getImages(camera.id).then( resp => {
                        if (resp && resp.length > 0) {
                            setObjectsToDisplay((prevObjects) => [
                                ...prevObjects,
                                { url: resp[0].url, isLiveStream: false },
                            ]);
                        }
                    })
                }
                //If the Camera has a Livestream URL
                if(camera.isActive && camera.livestreamUrl.length > 4){
                    setObjectsToDisplay((prevObjects) => [
                        ...prevObjects,
                        { url: `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${camera.id}/livestream`, isLiveStream: true },
                    ]);
                }
            })
        }
    }, [fpfId, camerasToDisplay]);

    const slides = objectsToDisplay.map((objectToDisplay) => (
        <Carousel.Slide>
            {!objectToDisplay.isLiveStream && (
                <Image src={objectToDisplay.url} alt="Last Received Image" style={{ width: '100%', height: '18vw', maxWidth:'50vw' }} />
            )}
            {objectToDisplay.isLiveStream && (
                <VideoPlayer src={objectToDisplay.url}/>
            )}
        </Carousel.Slide>
    ))

    return (
        <Carousel>
            {slides}
            </Carousel>
    )
}