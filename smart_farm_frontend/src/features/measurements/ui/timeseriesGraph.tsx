import React, { useEffect, useState } from 'react';
import { LineChart } from '@mantine/charts';
import '@mantine/dates/styles.css';
import { requestMeasuremnt } from "../useCase/requestMeasurements";
import { receivedMeasurementEvent } from "../state/measurementSlice";
import { useAppSelector } from "../../../utils/Hooks";
import { Measurement } from "../models/measurement";
import {Button, Card, Flex, Title, Badge} from "@mantine/core";
import { IconZoomScan } from "@tabler/icons-react";
import {Sensor} from "../../sensor/models/Sensor";
import useWebSocket from "react-use-websocket";
import {getWebSocketToken} from "../../../utils/WebSocket/getWebSocketToken";
import {format} from "node:url";
import {BACKEND_URL} from "../../../env-config";

const TimeseriesGraph: React.FC<{sensor:Sensor}> = ({sensor}) => {

    const measurementReceivedEventListener = useAppSelector(receivedMeasurementEvent);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);

    const [shouldReconnect, setShouldReconnect] = useState<boolean>(false);
    const [socketURL, setSocketUrl] = useState<string | null>(null)
    const [minXValue, setMinXValue] = useState<number>(10)
    const [maxXValue, setMaxXValue] = useState<number>(10)
    let {lastMessage, readyState} = useWebSocket(socketURL || "",{
        shouldReconnect:() => shouldReconnect})

    const reconnectSocket = async (): Promise<boolean> => {
        try {
            const resp = await getWebSocketToken();
            if (resp) {
                let base_url = BACKEND_URL;
                if (base_url) {
                    if (base_url.startsWith('https')) {
                        base_url = base_url.replace('https', 'wss');
                    } else if (base_url.startsWith('http')) {
                        base_url = base_url.replace('http', 'ws');
                    } else {
                        console.log(`REACT_APP_BACKEND_URL ${base_url} not configured correctly, needs to begin with http/https.`);
                        return false;
                    }
                } else {
                    console.log('REACT_APP_BACKEND_URL not configured.');
                    return false;
                }
                console.log(`${base_url}/ws/sensor/${sensor?.id}?token=${encodeURIComponent(resp.token)}`);
                //setSocketUrl(`${base_url}/ws/sensor/${sensor?.id}?token=${encodeURIComponent(resp.token)}`);
                //setShouldReconnect(true); // Verbindung erlauben
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
    if (lastMessage) {
        const data = JSON.parse(lastMessage.data);

        const newMeasurements  = data.measurement.map((measurement: Measurement) => (
            {
            value: Math.round(measurement.value * 100) / 100,
            measuredAt: measurement.measuredAt
        })
        );
        setMeasurements((prevMeasurements) => [...prevMeasurements, ...newMeasurements]);
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


    useEffect(() => {
        if (measurements.length > 0) {
            const values = measurements.map((item) => item.value);
            const minValue = Math.min(...values) - 5;
            const maxValue = Math.max(...values) + 5;

            setMinXValue(minValue)
            setMaxXValue(maxValue)
        }
    }, [measurements]);

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
                key={measurements.length}
                data={measurements.slice(-50)}
                dataKey="measuredAt"
                series={[{ name: "value", color: '#199ff4', label: sensor?.unit }]}
                curveType="monotone"
                style={{
                    borderRadius: '3px',
                    padding: '15px',
                    width: "100%"
                }}
                tickLine="y"
                xAxisProps={{
                  tickFormatter: (dateString) => {
                    const date = new Date(dateString);
                    const now = new Date();

                    const isSameDay =
                      date.getDate() === now.getDate() &&
                      date.getMonth() === now.getMonth() &&
                      date.getFullYear() === now.getFullYear();

                    const isSameYear = date.getFullYear() === now.getFullYear();

                    return isSameDay
                      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Show time for the same day
                      : isSameYear
                      ? date.toLocaleDateString([], { month: '2-digit', day: '2-digit' }) // Show date without year for the same year
                      : date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }); // Show full date including year for other years
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
                            <Card color="grey" style={{ }}>
                              <strong>{new Date(label).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit',  hour: '2-digit', minute: '2-digit' })}</strong>
                              {payload.map((item) => (
                                <div key={item.name}>
                                  {item.value}{sensor.unit}
                                </div>
                              ))}
                            </Card>
                          );
                        }
                        return null;
                      }
                }}
            />
        </Card>
    );
};

export default TimeseriesGraph;
