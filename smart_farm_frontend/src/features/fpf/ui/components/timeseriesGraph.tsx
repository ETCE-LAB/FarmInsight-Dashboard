import React, { useState } from 'react';
import { LineChart } from '@mantine/charts';
import {DateTimePicker} from "@mantine/dates";
import { Box, Notification, Text } from '@mantine/core';

// Mock temperature data
const allData = [
    { date: '2024-10-01 08:00', Temperature: 15 },
    { date: '2024-10-01 14:00', Temperature: 17 },
    { date: '2024-10-01 20:00', Temperature: 16 },
    { date: '2024-10-02 08:00', Temperature: 14 },
    { date: '2024-10-02 14:00', Temperature: 16 },
    { date: '2024-10-02 20:00', Temperature: 15 },
    { date: '2024-10-03 08:00', Temperature: 13 },
    { date: '2024-10-03 14:00', Temperature: 18 },
    { date: '2024-10-03 20:00', Temperature: 17 },
    { date: '2024-10-04 08:00', Temperature: 18 },
    { date: '2024-10-04 14:00', Temperature: 20 },
    { date: '2024-10-04 20:00', Temperature: 19 },
    { date: '2024-10-05 08:00', Temperature: 17 },
    { date: '2024-10-05 14:00', Temperature: 19 },
    { date: '2024-10-05 20:00', Temperature: 18 },
    { date: '2024-10-06 08:00', Temperature: 19 },
    { date: '2024-10-06 14:00', Temperature: 21 },
    { date: '2024-10-06 20:00', Temperature: 20 },
    { date: '2024-10-07 08:00', Temperature: 20 },
    { date: '2024-10-07 14:00', Temperature: 22 },
    { date: '2024-10-07 20:00', Temperature: 21 },
    { date: '2024-10-08 08:00', Temperature: 21 },
    { date: '2024-10-08 14:00', Temperature: 23 },
    { date: '2024-10-08 20:00', Temperature: 22 },
    { date: '2024-10-09 08:00', Temperature: 22 },
    { date: '2024-10-09 14:00', Temperature: 24 },
    { date: '2024-10-09 20:00', Temperature: 23 },
    { date: '2024-10-10 08:00', Temperature: 23 },
    { date: '2024-10-10 14:00', Temperature: 25 },
    { date: '2024-10-10 20:00', Temperature: 24 },
    { date: '2024-10-11 08:00', Temperature: 24 },
    { date: '2024-10-11 14:00', Temperature: 26 },
    { date: '2024-10-11 20:00', Temperature: 25 },
    { date: '2024-10-12 08:00', Temperature: 23 },
    { date: '2024-10-12 14:00', Temperature: 25 },
    { date: '2024-10-12 20:00', Temperature: 24 },
    { date: '2024-10-13 08:00', Temperature: 22 },
    { date: '2024-10-13 14:00', Temperature: 24 },
    { date: '2024-10-13 20:00', Temperature: 23 },
    { date: '2024-10-14 08:00', Temperature: 21 },
    { date: '2024-10-14 14:00', Temperature: 23 },
    { date: '2024-10-14 20:00', Temperature: 22 },
];


export const TimeseriesGraph: React.FC = () => {
    const [data, setData] = useState(allData);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Function to filter data based on selected date range
    const filterDataByRange = () => {
        if (startDate && endDate) {
            const start = startDate.toISOString();
            const end = endDate.toISOString();

            // Check if the selected range is valid
            const isValidRange = allData.some((item) => {
                const itemDate = new Date(item.date).toISOString();
                return itemDate >= start && itemDate <= end;
            });

            if (!isValidRange) {
                setError('Selected date range is outside the existing data.');
                setData([]); // Clear data if range is invalid
            } else {
                setError(null); // Clear any previous error
                const filteredData = allData.filter((item) => {
                    const itemDate = new Date(item.date).toISOString();
                    return itemDate >= start && itemDate <= end;
                });
                setData(filteredData);
            }
        }
    };

    return (
        <Box style={{ padding: '20px', backgroundColor: '#FAF9F6', borderRadius: '8px', marginTop: '30px' }}>
            {/* Date pickers */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <DateTimePicker
                    label="Start Date and Time"
                    placeholder="Select start date and time"
                    value={startDate}
                    onChange={(value) => {
                        setStartDate(value);
                        filterDataByRange();
                    }}
                    style={{ flex: 1 }}
                    styles={{
                        input: { borderColor: '#199ff4' },
                        label: { color: '#105385' },
                    }}
                />
                <DateTimePicker
                    label="End Date and Time"
                    placeholder="Select end date and time"
                    value={endDate}
                    onChange={(value) => {
                        setEndDate(value);
                        filterDataByRange();
                    }}
                    style={{ flex: 1 }}
                    styles={{
                        input: { borderColor: '#199ff4' },
                        label: { color: '#105385' },
                    }}
                />
            </div>

            {/* Error notification */}
            {error && (
                <Notification
                    title="Invalid Date Range"
                    color="red"
                    onClose={() => setError(null)}
                    style={{ marginBottom: '20px' }}
                >
                    {error}
                </Notification>
            )}

            {/* LineChart */}
            <LineChart
                h={300}
                data={data}
                dataKey="date"
                series={[{ name: 'Temperature', color: '#199ff4' }]}
                curveType="linear"
                style={{
                    backgroundColor: '#e9e9e9',
                    borderRadius: '5px',
                    padding: '15px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
                xAxisProps={{
                    color: '#333333',
                    fontSize: '12px',
                }}
                yAxisProps={{
                    color: '#333333',
                    fontSize: '12px',
                }}
            />
        </Box>
    );
};