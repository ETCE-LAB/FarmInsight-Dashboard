import React from 'react';
import TimeseriesGraph from "../../../features/measurements/ui/timeseriesGraph";
import temperatureData from "../../../temperatureData.json";
import humidityData from "../../../humidityData.json";
import lightData from "../../../lightData.json";
import phLevelData from "../../../phLevelData.json";
import placeholderImage from "../../../placeholder.png";
import GrowingCycleList from "../../../features/growthCycle/ui/growingCycleList";

export const MainFrame = () => {

    return (
        <div style={{ display: 'flex', height: 'auto', width: '100vw' }}>
            <div style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <div style={{ flex: 1, marginRight: '20px', overflowY: "scroll", maxHeight: "85vh", maxWidth: "50vw" }}>
                        <TimeseriesGraph data={temperatureData} title="Temperature" />
                        <TimeseriesGraph data={humidityData} title="Humidity" />
                        <TimeseriesGraph data={lightData} title="Light" />
                        <TimeseriesGraph data={phLevelData} title="PH Level" />
                    </div>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: 'auto', marginBottom: '20px'}}>
                            {/* Camera feed placeholder */}
                            <img src={placeholderImage} alt="Placeholder" style={{width: '100%', height: 'auto'}}/>
                        </div>
                        <div>
                            <GrowingCycleList fpfId={'d47d820738ba44ee953be36b50becf2f'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
