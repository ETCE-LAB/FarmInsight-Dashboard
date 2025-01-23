import React, { useEffect, useState } from 'react';
import { LineChart } from '@mantine/charts';
import '@mantine/dates/styles.css';
import { requestMeasuremnt } from "../useCase/requestMeasurements";
import { receivedMeasurementEvent } from "../state/measurementSlice";
import { useAppSelector } from "../../../utils/Hooks";
import { Measurement } from "../models/measurement";
import { Card, Flex, Title, Notification, LoadingOverlay, Center } from "@mantine/core";
import { Sensor } from "../../sensor/models/Sensor";
import useWebSocket from "react-use-websocket";
import { getWebSocketToken } from "../../../utils/WebSocket/getWebSocketToken";
import {format} from "node:url";
import {BACKEND_URL} from "../../../env-config";

const TimeseriesGraph: React.FC<{ sensor: Sensor }> = ({ sensor }) => {
    const measurementReceivedEventListener = useAppSelector(receivedMeasurementEvent);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [shouldReconnect, setShouldReconnect] = useState<boolean>(false);
    const [socketURL, setSocketUrl] = useState<string | null>(null);
    const [minXValue, setMinXValue] = useState<number>(10);
    const [maxXValue, setMaxXValue] = useState<number>(10);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [isFirefox, setIsFirefox] = useState(true);
    useEffect(() => {
        // Detect if the browser is Firefox
        const userAgent = navigator.userAgent.toLowerCase();
        setIsFirefox(userAgent.includes('firefox'));
    }, []);

    let { lastMessage, readyState } = useWebSocket(socketURL || "", {
        shouldReconnect: () => shouldReconnect,
    }, !isFirefox);

    const reconnectSocket = async (): Promise<void> => {
        try {
            const resp = await getWebSocketToken();
            if (!resp) {
                throw new Error("No WebSocket token received.");
            }

            let baseUrl = BACKEND_URL;
            if (!baseUrl) {
                throw new Error("REACT_APP_BACKEND_URL is not configured.");
            }

            if (baseUrl.startsWith("https")) {
                baseUrl = baseUrl.replace("https", "wss");
            } else if (baseUrl.startsWith("http")) {
                baseUrl = baseUrl.replace("http", "ws");
            } else {
                throw new Error(`Invalid REACT_APP_BACKEND_URL: ${baseUrl}`);
            }

            setSocketUrl(`${baseUrl}/ws/sensor/${sensor?.id}?token=${encodeURIComponent(resp.token)}`);
            setShouldReconnect(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to reconnect WebSocket.");
            setShouldReconnect(false); // Verbindung verhindern
        }
    };

    useEffect(() => {
        if (lastMessage) {
            try {
                const data = JSON.parse(lastMessage.data);

                if (!data.measurement) {
                    throw new Error("Invalid WebSocket message format.");
                }

                const newMeasurements = data.measurement.map((measurement: Measurement) => ({
                    value: Math.round(measurement.value * 100) / 100,
                    measuredAt: measurement.measuredAt,
                }));
                setMeasurements((prevMeasurements) => [...prevMeasurements, ...newMeasurements]);
            } catch (err) {
                console.error("Error processing WebSocket message:", err);
                setError("Failed to process incoming data.");
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (!isFirefox && sensor) {
            reconnectSocket().catch((err) => console.error("Error during WebSocket connection:", err));
        } else {
            setSocketUrl(null);
            setShouldReconnect(false);
        }
    }, [sensor, isFirefox]);

    useEffect(() => {
        setLoading(true);
        requestMeasuremnt(sensor.id, "2024-10-10")
            .then((resp) => {
                if (!resp) throw new Error("Failed to fetch measurements.");
                const roundedMeasurements = resp.map((measurement) => ({
                    ...measurement,
                    value: parseFloat(measurement.value.toFixed(2)),
                }));
                setMeasurements(roundedMeasurements);
            })
            .catch((err) => {
                console.error("Error fetching measurements:", err);
                setError("Failed to fetch initial measurements.");
            })
            .finally(() => setLoading(false));
    }, [measurementReceivedEventListener]);

    useEffect(() => {
        if (measurements.length > 0) {
            const values = measurements.map((item) => item.value);
            const minValue = Math.min(...values) - 5;
            const maxValue = Math.max(...values) + 5;

            setMinXValue(parseFloat(minValue.toFixed(0)));
            setMaxXValue(parseFloat(maxValue.toFixed(0)));
        }
    }, [measurements]);

    return (
        <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />
            <Card p="lg" radius="md" style={{ marginBottom: '30px' }}>
                <Flex justify="space-between" align="center" mb="md">
                    <Title order={3} style={{ color: '#199ff4' }}>{sensor?.name}</Title>
                </Flex>
                {error ? (
                    <Center style={{ height: '250px' }}>
                        <Notification color="red" onClose={() => setError(null)}>
                            {error}
                        </Notification>
                    </Center>
                ) : (
                    <LineChart
                        key={measurements.length}
                        activeDotProps={{ r: 7, strokeWidth: 1 }}
                        data={measurements.slice(-50)}
                        dataKey="measuredAt"
                        series={[{ name: "value", color: '#199ff4', label: sensor?.unit }]}
                        curveType="monotone"
                        style={{
                            borderRadius: '3px',
                            padding: '15px',
                            width: "100%",
                        }}
                        xAxisProps={{
                            tickFormatter: (dateString) => {
                                const date = new Date(dateString);
                                const now = new Date();

                                const isSameDay = date.toDateString() === now.toDateString();
                                const isSameYear = date.getFullYear() === now.getFullYear();

                                return isSameDay
                                    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : isSameYear
                                        ? date.toLocaleDateString([], { month: '2-digit', day: '2-digit' })
                                        : date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
                            },
                        }}
                        yAxisProps={{
                            domain: [minXValue, maxXValue],
                        }}
                        h={250}
                        tooltipAnimationDuration={200}
                        tooltipProps={{
                            content: ({ label, payload }) => {
                                if (payload && payload.length > 0) {
                                    return (
                                        <Card color="grey" style={{}}>
                                            <strong>{new Date(label).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</strong>
                                            {payload.map((item) => (
                                                <Flex key={item.name}>
                                                    {item.value}{sensor.unit}
                                                </Flex>
                                            ))}
                                        </Card>
                                    );
                                }
                                return null;
                            },
                        }}
                    />
                )}
            </Card>
        </div>
    );
};

export default TimeseriesGraph;
