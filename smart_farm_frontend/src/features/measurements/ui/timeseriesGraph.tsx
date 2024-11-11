import React, {useEffect, useState} from 'react';
import { LineChart } from '@mantine/charts';
import '@mantine/dates/styles.css';
import {requestMeasuremnt} from "../useCase/requestMeasurements";
import {receivedMeasurementEvent} from "../state/measurementSlice";
import {useAppSelector} from "../../../utils/Hooks";
import {Measurement} from "../models/measurement";






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
            setMeasurements(resp)
        })

    }, [measurementReceivedEventListener]);

    // Berechnung des y-Achsen-Bereichs basierend auf den Datenwerten
    const calculateDomain = () => {
        if (data.length === 0) return [-10, 10]; // Standardwert, wenn keine Daten vorhanden sind

        const values = data.map((item) => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const padding = 2;

        return [minValue - padding, maxValue + padding];
    };

    return (
        <div style={{ padding: '20px', borderRadius: '9px', margin: '30px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{color: '#199ff4', marginBottom: '10px' }}>{title}</h3>
            <LineChart
                data={data}
                dataKey="date"
                series={[{ name: "value", color: '#199ff4', label: title }]}
                curveType="monotone"
                style={{
                    borderRadius: '3px',
                    padding: '15px',
                }}
                xAxisProps={{
                    color: '#105385',
                    padding: { left: 30, right: 30 }
                }}
                yAxisProps={{
                    color: '#105385',
                    domain: calculateDomain(),
                }}
                h={185}
            />
        </div>
    );
};

export default TimeseriesGraph;