import React, { useEffect, useState } from 'react';
import { LineChart } from '@mantine/charts';
import '@mantine/dates/styles.css';
import { requestMeasuremnt } from "../useCase/requestMeasurements";
import { receivedMeasurementEvent } from "../state/measurementSlice";
import { useAppSelector } from "../../../utils/Hooks";
import { Measurement } from "../models/measurement";
import { Card, Flex, Title, Notification, LoadingOverlay, Center, useMantineTheme } from "@mantine/core";
import { Sensor } from "../../sensor/models/Sensor";
import useWebSocket from "react-use-websocket";
import { getWebSocketToken } from "../../../utils/WebSocket/getWebSocketToken";
import {BACKEND_URL} from "../../../env-config";

const TimeseriesGraph: React.FC<{ sensor: Sensor }> = ({ sensor }) => {
    const theme = useMantineTheme();
    const measurementReceivedEventListener = useAppSelector(receivedMeasurementEvent);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [shouldReconnect, setShouldReconnect] = useState<boolean>(false);
    const [socketURL, setSocketUrl] = useState<string | null>("ws://localhost");
    const [minXValue, setMinXValue] = useState<number>(10);
    const [maxXValue, setMaxXValue] = useState<number>(10);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    let { lastMessage } = useWebSocket(socketURL || "", {
        shouldReconnect: () => shouldReconnect,
    });

    const reconnectSocket = async () => {
        try {
            const resp = await getWebSocketToken();
            if (!resp) throw new Error("No WebSocket token received.");

            let baseUrl = BACKEND_URL;
            if (!baseUrl) throw new Error("REACT_APP_BACKEND_URL is not configured.");

            baseUrl = baseUrl.replace(/^https?/, "wss").replace(/^http?/, "ws");
            setSocketUrl(`${baseUrl}/ws/sensor/${sensor?.id}?token=${encodeURIComponent(resp.token)}`);
            setShouldReconnect(true);
        } catch (err) {
            console.error(err);
            setError("Failed to reconnect WebSocket.");
            setShouldReconnect(false);
        }
    };

    useEffect(() => {
        if (lastMessage) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (!data.measurement) throw new Error("Invalid WebSocket message format.");

                const newMeasurements = data.measurement.map((m: Measurement) => ({
                    value: Math.round(m.value * 100) / 100,
                    measuredAt: m.measuredAt,
                }));
                setMeasurements((prev) => [...prev, ...newMeasurements]);
            } catch (err) {
                console.error("Error processing WebSocket message:", err);
                setError("Failed to process incoming data.");
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (sensor) {
            reconnectSocket();
        } else {
            setSocketUrl(null);
            setShouldReconnect(false);
        }
    }, [sensor]);

    useEffect(() => {
        setLoading(true);
        requestMeasuremnt(sensor.id)
            .then((resp) => {
                if (!resp) throw new Error("Failed to fetch measurements.");
                const roundedMeasurements = resp.map(m => ({ ...m, value: parseFloat(m.value.toFixed(2)) }));
                setMeasurements(roundedMeasurements);
            })
            .catch(err => {
                console.error("Error fetching measurements:", err);
                setError("Failed to fetch initial measurements.");
            })
            .finally(() => setLoading(false));
    }, [measurementReceivedEventListener]);

    useEffect(() => {
        if (measurements.length > 0) {
            const values = measurements.map(m => m.value);

            setMinXValue(parseFloat((Math.min(...values) - 5).toFixed(2)));
            setMaxXValue(parseFloat((Math.max(...values) + 5).toFixed(2)));
        }
    }, [measurements]);

    return (
        <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />
            <Card p="md" radius="md" style={{ marginBottom: '20px' }}>
                <Flex justify="space-between" align="center" mb="md" direction={{ base: "column", sm: "row" }}>
                    <Title order={4} c={theme.colors.blue[6]}>{sensor?.name}</Title>
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
                        activeDotProps={{ r: 6, strokeWidth: 1 }}
                        data={measurements.slice(-50)}
                        dataKey="measuredAt"
                        series={[{ name: "value", color: theme.colors.blue[6], label: sensor?.unit }]}
                        curveType="monotone"
                        style={{ borderRadius: '5px', padding: '10px', width: "100%" }}
                        xAxisProps={{ tickFormatter: (dateString) => {
                                const date = new Date(dateString);
                                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            }}}
                        yAxisProps={{ domain: [minXValue, maxXValue] }}
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
