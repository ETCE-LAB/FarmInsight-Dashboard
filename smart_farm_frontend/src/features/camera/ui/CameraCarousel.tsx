import React, {useEffect, useState} from "react";
import {Camera, EditCamera} from "../models/camera";
import {useParams} from "react-router-dom";
import { Carousel } from '@mantine/carousel';
import {getImages} from "../useCase/getImages";
import {Image, Title} from '@mantine/core';
import {getUser} from "../../../utils/getUser";
import {useAuth} from "react-oidc-context";

interface displayObject {
    url:string,
    title:string,
    isLiveStream:boolean
}

interface VideoPlayerProps {
    src: string; // Define the type for the `src` prop
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const token = getUser()?.access_token; // Retrieve the token
                const response = await fetch(src, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch video: ${response.statusText}`);
                }

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setVideoUrl(blobUrl);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();

        // Cleanup blob URL when component unmounts
        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [src]);

    if (!videoUrl) {
        return <div>Loading video...</div>;
    }

    return (
        <video controls style={{ width: '100%', height: '18vw', maxWidth: '50vw' }}>
            <source src={videoUrl} type="video/mp4"/>

            Your browser does not support the video tag.
        </video>
    );
};

export const CameraCarousel:React.FC<{camerasToDisplay:Camera[]}> = ({camerasToDisplay}) => {
    const { organizationId, fpfId } = useParams();
    const[objectsToDisplay, setObjectsToDisplay] = useState<displayObject[]>([]);
    const auth = useAuth();

    useEffect(() => {
        if(camerasToDisplay){
            //Reset/Clear current List
            setObjectsToDisplay([])
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
            })
        }
    }, [fpfId, camerasToDisplay]);

    let index = 0

    const slides = objectsToDisplay.map((objectToDisplay) => (
        <Carousel.Slide key={index}>
            <Title order={3} style={{}} >
                {objectToDisplay.title}
            </Title>
            {!objectToDisplay.isLiveStream && (
                <Image src={objectToDisplay.url} alt="Last Received Image" fit="contain"  style={{ height: '18vw', maxWidth:'50vw' }} />
            )}
            {auth.isAuthenticated && objectToDisplay.isLiveStream && (
                <VideoPlayer src={objectToDisplay.url}
                />
            )}
            {index = index +1}
        </Carousel.Slide>

    ))

    return (
        <Carousel withIndicators>
            {slides}
            </Carousel>
    )
}