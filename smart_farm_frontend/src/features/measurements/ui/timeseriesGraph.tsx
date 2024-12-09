import React, { useEffect, useState } from 'react';
import { LineChart } from '@mantine/charts';
import '@mantine/dates/styles.css';
import { requestMeasuremnt } from "../useCase/requestMeasurements";
import { receivedMeasurementEvent } from "../state/measurementSlice";
import { useAppSelector } from "../../../utils/Hooks";
import { Measurement } from "../models/measurement";
import {Box, Button, Card, Flex, Text, Title} from "@mantine/core";
// @ts-ignore
import { IconZoomScan } from "@tabler/icons-react";
import {Sensor} from "../../sensor/models/Sensor";
import useWebSocket from "react-use-websocket";
import {getWebSocketToken} from "../../../utils/WebSocket/getWebSocketToken";
import {read} from "node:fs";

const TimeseriesGraph: React.FC<{sensor:Sensor}> = ({sensor}) => {

    const measurementReceivedEventListener = useAppSelector(receivedMeasurementEvent);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);

    const [shouldReconnect, setShouldReconnect] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null)
    const [socketURL, setSocketUrl] = useState<string | null>(null)
    let {lastMessage, readyState} = useWebSocket(socketURL || "",{
        shouldReconnect:() => shouldReconnect})

    const reconnectSocket = async (): Promise<boolean> => {
        try {
            const resp = await getWebSocketToken();
            if (resp) {
                setSocketUrl(`ws://localhost:8000/ws/sensor/${sensor?.id}?token=${encodeURIComponent(resp.token)}`);
                setShouldReconnect(true); // Verbindung erlauben
                return true;
            } else {
                console.warn('No Token received, can not establish Connection to WebSocket.');
                setShouldReconnect(false); // Verbindung verhindern
                return false;
            }
        } catch (error) {
            console.error('Error while receiving the Token:', error);
            setShouldReconnect(false); // Verbindung verhindern
            return false;
        }
    };


    useEffect(() => {
        if(lastMessage){
            const data = JSON.parse(lastMessage.data)
            const roundedMeasurements = data.measurement.map((measurement: number) =>
                Math.round(measurement * 100) / 100
            );
            setMeasurements([...measurements, ...roundedMeasurements])
        }
    }, [lastMessage]);

    useEffect(() => {
        if(sensor){
            reconnectSocket()
        }
        setSocketUrl(null); // Verbindung deaktivieren, wenn kein Sensor vorhanden ist
        setShouldReconnect(false);
    }, [sensor])

    useEffect(() => {
        requestMeasuremnt(sensor.id, "2024-10-10").then(resp => {

            if(resp) {
                // Round the values before setting them
                const roundedMeasurements = resp.map((measurement) => ({
                    ...measurement,
                    value: parseFloat(measurement.value.toFixed(2)),
                }));
                setMeasurements(roundedMeasurements);
            }
        });
    }, [measurementReceivedEventListener]);


    const calculateDomain = () => {
        if (measurements.length === 0) return [-10, 10];
        const values = measurements.map((item) => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const padding = 2;
        return [minValue - padding, maxValue + padding];
    };

    return (
        <Card p="lg" shadow="sm" radius="md" style={{ marginBottom: '30px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
            <Flex justify="space-between" align="center" mb="md">
                <Title order={3} style={{ color: '#199ff4' }}>{sensor?.name}</Title>
                <Button
                    variant="filled"
                    color="blue"
                    style={{ backgroundColor: '#105385' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0c4065'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#105385'}
                >
                    <IconZoomScan size={20} />
                </Button>
            </Flex>

            <LineChart
                data={measurements}
                dataKey="date"
                series={[{ name: "value", color: '#199ff4', label: sensor?.unit }]}
                curveType="monotone"
                style={{
                    borderRadius: '3px',
                    padding: '15px',
                }}
                xAxisProps={{
                    color: '#105385',
                    padding: { left: 30, right: 30 },
                }}
                yAxisProps={{
                    color: '#105385',
                    domain: calculateDomain(),
                }}
                h={185}
            />
        </Card>
    );
};

export default TimeseriesGraph;