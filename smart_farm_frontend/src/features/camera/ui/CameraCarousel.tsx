import React, { useEffect, useState } from "react";
import { Camera } from "../models/camera";
import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { getImages } from "../useCase/getImages";
import {
    Box,
    Card,
    Center,
    Image,
    Switch,
    Title,
    Text,
    Flex,
    Divider,
    Stack,
    Badge,
    rem,
} from "@mantine/core";
import { useAuth } from "react-oidc-context";
import { Livestream } from "./Livestream";
import { IconCamera, IconVideo, IconVideoOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export interface displayObject {
    url: string;
    title: string;
    isLiveStream: boolean;
}

export const CameraCarousel: React.FC<{ camerasToDisplay: Camera[] }> = ({
                                                                             camerasToDisplay,
                                                                         }) => {
    const { fpfId } = useParams();
    const [objectsToDisplay, setObjectsToDisplay] = useState<displayObject[]>([]);
    const [showLivestream, setShowLivestream] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const auth = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        setObjectsToDisplay([]);

        if (camerasToDisplay.length > 0) {
            camerasToDisplay.forEach((camera) => {
                if (camera.isActive) {
                    if (showLivestream) {
                        setObjectsToDisplay((prevObjects) => [
                            ...prevObjects,
                            {
                                url: `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${camera.id}/livestream`,
                                title: `${camera.name} LiveStream`,
                                isLiveStream: true,
                            },
                        ]);
                    } else {
                        getImages(camera.id).then((resp) => {
                            if (resp && resp.length > 0) {
                                setObjectsToDisplay((prevObjects) => [
                                    ...prevObjects,
                                    {
                                        url: resp[resp.length - 1].url,
                                        title: `${camera.name}`,
                                        isLiveStream: false,
                                    },
                                ]);
                            }
                        });
                    }
                }
            });
        }
    }, [fpfId, camerasToDisplay, showLivestream]);

    const slides = objectsToDisplay.map((objectToDisplay, index) => (
        <Carousel.Slide key={index}>
            {!objectToDisplay.isLiveStream && (
                <>
                    <Image
                        src={objectToDisplay.url}
                        alt="Last Received Image"
                        fit="cover"
                        radius="md"
                    />
                    <Badge
                        color="dark"
                        variant="filled"
                        size="md"
                        style={{
                            position: "absolute",
                            top: rem(10),
                            left: rem(10),
                        }}
                    >
                        {objectToDisplay.title}
                    </Badge>
                </>
            )}
            {auth.isAuthenticated && objectToDisplay.isLiveStream && (
                <Livestream src={objectToDisplay} />
            )}
        </Carousel.Slide>
    ));

    return (
        <Card p="lg" radius="md">
            {auth.isAuthenticated && (
                <Stack align="center" mb="xs">
                    <Text size="sm" fw={500}>
                        {t("label.setCameraCarousel")}
                    </Text>
                    <Switch
                        offLabel={<IconCamera size={16} />}
                        onLabel={<IconVideo size={16} />}
                        size="md"
                        checked={showLivestream}
                        onChange={(e) => setShowLivestream(e.currentTarget.checked)}
                    />
                </Stack>
            )}

            <Divider my="xs"/>

            <Center>
                {camerasToDisplay && camerasToDisplay.length > 0 ? (
                    <Box
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            position: "relative",
                            borderRadius: rem(5),
                            overflow: "hidden",
                            width: "100%",
                        }}
                    >
                        <Carousel
                            withIndicators
                            loop
                            controlSize={32}
                            styles={{
                                controls: {
                                    opacity: isHovered ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                },
                            }}
                        >
                            {slides}
                        </Carousel>
                    </Box>
                ) : (
                    <Center style={{ height: "35vh" }}>
                        <IconVideoOff size={64} color="gray" />
                    </Center>
                )}
            </Center>
        </Card>
    );
};
