import React, {useEffect, useState} from 'react';
import { LineChart } from '@mantine/charts';
import {DateTimePicker} from "@mantine/dates";
import { Box, Notification, Text } from '@mantine/core';
import '@mantine/dates/styles.css';
import {receiveUserProfile} from "../../userProfile/useCase/receiveUserProfile";
import {requestMeasuremnt} from "../useCase/requestMeasurements";
import {receivedMeasurement, receivedMeasurementEvent} from "../state/measurementSlice";
import {useAppSelector} from "../../../utils/Hooks";
import {receivedUserProfileEvent} from "../../userProfile/state/UserProfileSlice";
import {UserProfile} from "../../userProfile/models/UserProfile";
import {Measurement} from "../models/measurement";
import {start} from "node:repl";





interface TimeseriesGraphProps {
    data: { date: string; value: number }[];
    title: string;
}

const TimeseriesGraph: React.FC<TimeseriesGraphProps> = ({ data, title }) => {

    const measurementReceivedEventListener = useAppSelector(receivedMeasurementEvent)
    const [measurements, setMeasurements] = useState<Measurement[] >([])


    useEffect(() => {

        //"2017-07-21T17:32:28Z
        // Jahr Monat Tag
        // "2024-11-01"
        //"2024-10-10
        requestMeasuremnt("8250f7569a3047ea8decf4cc101003da", "2024-10-10", "2024-11-01").then(resp => {
            console.log(resp)
            setMeasurements(resp)
        })

    }, [measurementReceivedEventListener]);

    // Berechnung des y-Achsen-Bereichs basierend auf den Datenwerten
    const calculateDomain = () => {
        if (data.length === 0) return [0, 10]; // Standardwert, wenn keine Daten vorhanden sind

        const values = data.map((item) => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const padding = 1;

        return [minValue - padding, maxValue + padding];
    };

    return (
        <div style={{ padding: '20px', borderRadius: '9px', margin: '30px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ color: '#105385', marginBottom: '10px' }}>{title}</h3>
            <LineChart
                data={data}
                dataKey="date"
                series={[{ name: "value", color: '#199ff4', label: title }]}
                curveType="bump"
                style={{
                    borderRadius: '3px',
                    padding: '15px',
                }}
                xAxisProps={{
                    color: '#105385',
                    fontSize: '12px',
                    padding: { left: 30, right: 30 }
                }}
                yAxisProps={{
                    color: '#105385',
                    fontSize: '12px',
                    domain: calculateDomain(),
                }}
                h={100}
            />
        </div>
    );
};

export default TimeseriesGraph;
