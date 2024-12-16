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

const Livestream: React.FC<VideoPlayerProps> = ({ src }) => {
    const [authenticatedSrc, setAuthenticatedSrc] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchAuthenticatedUrl = () => {
            try {
                const token = getUser()?.access_token;
                if (!token) {
                    throw new Error("No access token available");
                }

                const authenticatedUrl = `${src}?token=${encodeURIComponent(token)}`;
                setAuthenticatedSrc(authenticatedUrl);
            } catch (error) {
                console.error('Error generating authenticated URL:', error);
            }
        };

        fetchAuthenticatedUrl();

        return () => {
            isMounted = false;
            if (authenticatedSrc) {
                URL.revokeObjectURL(authenticatedSrc);
            }
        };
    }, [src]);

    if (!authenticatedSrc) {
        return <div>Loading stream...</div>;
    }

    return (
        <img
            src={authenticatedSrc}
            alt="Live Stream"
            style={{ width: '100%', height: '18vw', maxWidth: '50vw', objectFit: 'contain' }}
        />
    );
};

export const CameraCarousel: React.FC<{ camerasToDisplay: Camera[] }> = ({camerasToDisplay}) => {
    const {organizationId, fpfId} = useParams();
    const [objectsToDisplay, setObjectsToDisplay] = useState<displayObject[]>([]);
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
                                { url: resp[0].url, title: `${camera.name} Last Picture`, isLiveStream: false,   },
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

    let index = 0

    const slides = objectsToDisplay.map((objectToDisplay) => (
        <Carousel.Slide key={index}>
            <Title order={3} style={{}}>
                {objectToDisplay.title}
            </Title>
            {!objectToDisplay.isLiveStream && (
                <Image src={objectToDisplay.url} alt="Last Received Image" fit="contain"
                       style={{height: '18vw', maxWidth: '50vw'}}/>
            )}
            {auth.isAuthenticated && objectToDisplay.isLiveStream && (
                <Livestream src={objectToDisplay.url}/>
            )}
            {
                index = index + 1
            }
        </Carousel.Slide>
    ))

    return (
        <Carousel withIndicators>
            {slides}
        </Carousel>
    )
}