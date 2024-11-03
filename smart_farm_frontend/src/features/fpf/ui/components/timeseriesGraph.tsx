import React, { useState } from 'react';
import { LineChart } from '@mantine/charts';
import { Button } from '@mantine/core';

// Mock temperature data for 14 days
const allData = [
    { date: '2024-10-01', Temperature: 15 },
    { date: '2024-10-02', Temperature: 16 },
    { date: '2024-10-03', Temperature: 14 },
    { date: '2024-10-04', Temperature: 18 },
    { date: '2024-10-05', Temperature: 17 },
    { date: '2024-10-06', Temperature: 19 },
    { date: '2024-10-07', Temperature: 21 },
    { date: '2024-10-08', Temperature: 20 },
    { date: '2024-10-09', Temperature: 22 },
    { date: '2024-10-10', Temperature: 23 },
    { date: '2024-10-11', Temperature: 24 },
    { date: '2024-10-12', Temperature: 23 },
    { date: '2024-10-13', Temperature: 22 },
    { date: '2024-10-14', Temperature: 21 },
];

export const TimeseriesGraph: React.FC = () => {
    const [data, setData] = useState(allData);

    // Function to adjust data based on a selected timespan
    const handleTimespanChange = (days: number) => {
        if (days < allData.length) {
            setData(allData.slice(-days));
        } else {
            setData(allData); // Show all data if timespan exceeds total days available
        }
    };

    return (
        <div>
            {/* Timespan controls with custom hex colors */}
            <div style={{ marginBottom: '20px' }}>
                <Button
                    onClick={() => handleTimespanChange(14)}
                    style={{ backgroundColor: '#105385', color: '#FFFFFF', marginRight: '10px' }}
                >
                    Last 14 Days
                </Button>
                <Button
                    onClick={() => handleTimespanChange(7)}
                    style={{ backgroundColor: '#105385', color: '#FFFFFF', marginRight: '10px' }}
                >
                    Last 7 Days
                </Button>
                <Button
                    onClick={() => handleTimespanChange(3)}
                    style={{ backgroundColor: '#105385', color: '#FFFFFF' }}
                >
                    Last 3 Days
                </Button>
            </div>

            {/* LineChart with dynamic data */}
            <LineChart
                h={300}
                data={data}
                dataKey="date"
                series={[{ name: 'Temperature', color: '#199ff4' }]}
                curveType="linear"
            />
        </div>
    );
};
