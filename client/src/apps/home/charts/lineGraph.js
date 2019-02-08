import React from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";

class LineGraph extends React.Component {
  render() {
    const { title, data } = this.props;
    return (
      <>
      <div className="mb-10 mt-10 text-center bold">{title}</div>
        <LineChart width={1000} height={500} data={data}
          margin={{ top: 15, right: 100, left: 100, bottom: 40 }}>
          <XAxis dataKey="name" >
            <Label value="Hodina" offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Počet nehod" offset={-80} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" align="right" />
          <Line name="Pracovní týden" type="monotone" dataKey="result_weekday" stroke="#8884d8" />
          <Line name="Víkend" type="monotone" dataKey="result_weekend" stroke="#82ca9d" />
        </LineChart>
      </>
    );
  }
}

export default LineGraph;