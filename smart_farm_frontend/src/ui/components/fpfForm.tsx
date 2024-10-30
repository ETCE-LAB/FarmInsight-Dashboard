import React, { useState } from 'react';
import { Button, TextInput, Checkbox, Box } from "@mantine/core";
import { useAuth } from "react-oidc-context";

interface FoodProductionFacilityFormProps {
    organization: string;
    onSave: (data: {
        name: string;
        isPublic: boolean;
        sensorServiceIp: string;
        cameraServiceIp: string;
        address: string;
        organization: string;
    }) => void;
}

export const FoodProductionFacilityForm: React.FC<FoodProductionFacilityFormProps> = ({ organization, onSave }) => {
    const auth = useAuth();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [sensorServiceIp, setSensorServiceIp] = useState("");
    const [cameraServiceIp, setCameraServiceIp] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState<{ sensorServiceIp?: string; cameraServiceIp?: string }>({});

    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/;

    const validateIps = () => {
        const newErrors: { sensorServiceIp?: string; cameraServiceIp?: string } = {};

        if (!ipv4Regex.test(sensorServiceIp)) {
            newErrors.sensorServiceIp = "Invalid IPv4 address";
        }

        if (!ipv4Regex.test(cameraServiceIp)) {
            newErrors.cameraServiceIp = "Invalid IPv4 address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateIps()) {
            onSave({ name, isPublic, sensorServiceIp, cameraServiceIp, address, organization });
        }
    };

    return (
        <>
            {auth.isAuthenticated ? (
                <Button onClick={() => auth.signinRedirect()} variant="filled" color="green">
                    Login to manage Facility
                </Button>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <TextInput
                        label="Facility Name"
                        placeholder="Enter facility name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        required
                    />
                    <Checkbox
                        label="Public"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.currentTarget.checked)}
                        mt="md"
                    />
                    <TextInput
                        label="Sensor Service IP"
                        placeholder="Enter sensor service IP"
                        value={sensorServiceIp}
                        onChange={(e) => setSensorServiceIp(e.currentTarget.value)}
                        error={errors.sensorServiceIp}
                        required
                        mt="md"
                    />
                    <TextInput
                        label="Camera Service IP"
                        placeholder="Enter camera service IP"
                        value={cameraServiceIp}
                        onChange={(e) => setCameraServiceIp(e.currentTarget.value)}
                        error={errors.cameraServiceIp}
                        required
                        mt="md"
                    />
                    <TextInput
                        label="Address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.currentTarget.value)}
                        required
                        mt="md"
                    />
                    <Box mt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="filled" color="blue">
                            Create Facility
                        </Button>
                    </Box>
                </form>
            )}
        </>
    );
};
