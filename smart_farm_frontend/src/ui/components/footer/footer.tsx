import React from 'react';
import { Flex, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

const Footer: React.FC = () => {
    const githubLink = "https://github.com/ETCE-LAB";

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
                onClick={() => console.log("Clicked footer")}
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
