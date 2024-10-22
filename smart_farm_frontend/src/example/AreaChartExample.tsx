import {AreaChart} from "@mantine/charts";
import {data} from "../source/data";
import React from "react";

//This is an example from https://mantine.dev/charts/area-chart/


const AreaChartExample = () => {
    return(
        <AreaChart
            h={300}
            data={data}
            dataKey="date"
            series={[
                {name: 'Apples', color: 'indigo.6'},
                {name: 'Oranges', color: 'blue.6'},
                {name: 'Tomatoes', color: 'teal.6'},
            ]}
            curveType="linear"
        />
    )
}

export default AreaChartExample