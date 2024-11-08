import React from 'react';
import { LineChart } from '@mantine/charts';

interface TimeseriesGraphProps {
    data: { date: string; value: number }[];
    title: string;
}

const TimeseriesGraph: React.FC<TimeseriesGraphProps> = ({ data, title }) => {
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
