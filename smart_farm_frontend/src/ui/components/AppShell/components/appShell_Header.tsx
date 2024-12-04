import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Flex, Group, Text, Menu, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../../../utils/appRoutes';
import { UserProfileComponent } from '../../../../features/userProfile/ui/UserProfileComponent';
import { LoginButton } from '../../../../features/auth/ui/loginButton';
import { LogoutButton } from '../../../../features/auth/ui/logoutButton';

export const AppShell_Header: React.FC = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [currentFlag, setCurrentFlag] = useState('🇺🇸');

    const languageOptions = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'de', label: 'German', flag: '🇩🇪' },
        { code: 'fr', label: 'French', flag: '🇫🇷' },
        { code: 'it', label: 'Italian', flag: '🇮🇹' },
        { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
    ];

    // Detect browser language and set it as default language
    useEffect(() => {
        const browserLanguage = navigator.language.split('-')[0];
        const matchedLanguage =
            languageOptions.find((lang) => lang.code === browserLanguage) ||
            languageOptions[0];

        setSelectedLanguage(matchedLanguage.label);
        setCurrentFlag(matchedLanguage.flag);
        i18n.changeLanguage(matchedLanguage.code);  // Automatically set browser language

        console.log(`Browser language detected: ${matchedLanguage.label}`);
    }, [i18n]);

    const handleLanguageChange = (lang: { code: string; label: string; flag: string }) => {
        setSelectedLanguage(lang.label);
        setCurrentFlag(lang.flag);
        i18n.changeLanguage(lang.code);
        console.log(`Language switched to: ${lang.label}`);
    };

    return (
        <Group h="100%" px="md" style={{ width: '100%' }}>
            <Flex w="100%" justify="space-between" align="center">
                {/* Left Side: FARMINSIGHT */}
                <Flex align="center" gap="sm">
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(AppRoutes.base)}
                    >
                        <Card.Section>
                            <Text
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '8px 16px',
                                    fontSize: '20px',
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 'bold',
                                }}
                            >
                                {t('header.title')}
                            </Text>
                        </Card.Section>
                    </Card>
                    {/* Language Switcher Button */}
                    <Menu width={200}>
                        <Menu.Target>
                            <Button variant="subtle">
                                <Flex align="center" gap="sm">
                                    <span>{currentFlag}</span>
                                    <span>{selectedLanguage}</span>
                                </Flex>
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {languageOptions.map((lang) => (
                                <Menu.Item
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang)}
                                >
                                    <Flex align="center" gap="sm">
                                        <span>{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </Flex>
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                </Flex>
                {/* Right Side: Profile & Auth Buttons */}
                <Group gap="md">
                    <UserProfileComponent />
                    <LoginButton />
                    <LogoutButton />
                </Group>
            </Flex>
        </Group>
    );
};
