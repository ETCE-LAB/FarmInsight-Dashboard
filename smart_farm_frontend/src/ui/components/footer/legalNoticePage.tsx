// src/components/LegalNoticePage.tsx
import React from 'react';
import { Container, Title, Text, Stack, Anchor } from '@mantine/core';

const LegalNoticePage: React.FC = () => {
    return (
        <Container size="md" mt="xl" style={{overflowX: 'hidden'}}>
            <Stack style={{overflowX: 'hidden'}}>
                <Title order={1}>Legal Notice</Title>
                <Text>This legal notice was last updated on 13th January 2025.</Text>

                <Title order={2}>Website Owner</Title>
                <Text>
                    <strong>Benjamin Leiding</strong>
                    <br/>
                    Altewiekring 60
                    <br/>
                    38102 Braunschweig, Germany
                    <br/>
                    Email:{' '}
                    <Anchor href="mailto:bejamin.leiding@tu-clausthal.de">
                        bejamin.leiding@tu-clausthal.de
                    </Anchor>
                    <br/>
                    Phone: +49 170 76 77 606
                </Text>

                <Title order={2}>1. General</Title>
                <Text>
                    We are not willing or obliged to participate in dispute resolution
                    procedures before a consumer arbitration board.
                </Text>

                <Title order={2}>2. Data Processing</Title>
                <Text>
                    The following personal data are collected and processed:
                </Text>
                <Text component="ul">
                    <li>Username</li>
                    <li>Email address</li>
                </Text>
                <Text>
                    These data are used solely for providing access to the platform and
                    responding to support inquiries.
                </Text>

                <Title order={2}>3. Legal Basis</Title>
                <Text>
                    The processing of personal data is based on Article 6(1)(b) GDPR
                    (performance of a contract).
                </Text>

                <Title order={2}>4. Data Retention</Title>
                <Text>
                    Personal data will only be retained as long as necessary for the
                    purposes mentioned above. After that, they will be securely deleted.
                </Text>

                <Title order={2}>5. Your Rights</Title>
                <Text>You have the following rights under GDPR:</Text>
                <Text component="ul">
                    <li>Access to your stored data</li>
                    <li>Correction of incorrect data</li>
                    <li>Deletion of your data</li>
                    <li>Objection to the processing of your data</li>
                    <li>Data portability</li>
                </Text>
                <Text>
                    To exercise these rights, please contact us at the address mentioned
                    above.
                </Text>

                <Title order={2}>6. Liability Disclaimer</Title>
                <Text>
                    Benjamin Leiding is committed to keeping this website up to date and
                    accurate. However, no rights can be derived from the information on
                    this website. We are not liable for any loss due to inaccuracies or
                    incompleteness.
                </Text>

                <Title order={2}>7. Intellectual Property</Title>
                <Text>
                    All content on this website is protected by copyright and other
                    intellectual property rights owned by Benjamin Leiding unless otherwise
                    stated.
                </Text>

                <Title order={2}>8. Contact</Title>
                <Text>
                    If you have any questions or encounter any issues with this website,
                    please contact:
                </Text>
                <Text>
                    <strong>Benjamin Leiding</strong>
                    <br/>
                    Altewiekring 60
                    <br/>
                    38102 Braunschweig, Germany
                    <br/>
                    Email:{' '}
                    <Anchor href="mailto:bejamin.leiding@tu-clausthal.de">
                        bejamin.leiding@tu-clausthal.de
                    </Anchor>
                    <br/>
                    Phone: +49 170 76 77 606
                </Text>
            </Stack>
        </Container>
    );
}

    export default LegalNoticePage;
