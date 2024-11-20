import React from 'react';
import TimeseriesGraph from "../../../features/measurements/ui/timeseriesGraph";
import temperatureData from "../../../temperatureData.json";
import humidityData from "../../../humidityData.json";
import lightData from "../../../lightData.json";
import phLevelData from "../../../phLevelData.json";
import placeholderImage from "../../../placeholder.png";
import {receiveFpfData} from "../../../features/fpf/useCase/receiveFpfData";

export const MainFrame = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoTimestamp = oneWeekAgo.getTime();


    return (
        <div style={{ display: 'flex', height: 'auto', width: '100vw' }}>
            <div style={{ flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <div style={{ flex: 1, marginRight: '20px', overflowY: "scroll", maxHeight: "85vh", maxWidth: "50vw" }}>
                        <TimeseriesGraph/>
                        <TimeseriesGraph/>
                        <TimeseriesGraph/>
                        <TimeseriesGraph/>
                    </div>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: 'auto', marginBottom: '20px'}}>
                            {/* Camera feed placeholder */}
                            <img src={placeholderImage} alt="Placeholder" style={{width: '100%', height: 'auto'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
