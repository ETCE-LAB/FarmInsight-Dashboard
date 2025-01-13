import React from 'react';
import { Flex, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import {useNavigate} from "react-router-dom";

const Footer: React.FC = () => {
    const githubLink = "https://github.com/ETCE-LAB";
    const navigate = useNavigate();

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                height: "50px",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0 20px',
            }}
        >
            <Text
                style={{
                    cursor: "pointer",
                    color: "rgba(0, 0, 0, 0.4)", //TODO: Adapt color to theme
                }}
                onClick={() => navigate('/legal-notice')} // Navigate to the new page
            >
                Impress | Legal Notice | Privacy Policy
            </Text>

            <IconBrandGithub
                size={24}
                onClick={() => window.open(githubLink, "_blank")}
                style={{
                    cursor: 'pointer',
                    color: '#199ff4',
                    marginLeft: 25,
                }}
            />
        </Flex>
    );
};

export default Footer;
