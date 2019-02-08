import React from 'react';

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

import { COLORS } from './utils';

const renderLegend = (props) => {
  const { title, payload } = props;
  return (
    <>
      <div className="mb-10 text-center bold">{title}</div>
      <div className="mb-10 text-center small">Typ (počet nehod | podíl délky typu komunikace na celkové délce komunikací)</div>
      <ul className="pie-chart">
        {
          payload
            .filter(entry => entry.value !== 0)
            .map((entry, index) => (
              <li className="pie-chart__item" key={entry.name}>
                <span style={{ background: COLORS[entry.name] }} className="pie-chart__color" />{entry.name} ({entry.value} | {(entry.length_share).toFixed(2)} %)
          </li>
            ))
        }
      </ul>
    </>
  );
}

class PieGraph extends React.Component {
  render() {
    const { data, title } = this.props;
    return (
      <PieChart
        width={1000}
        height={600}
      >
        <Tooltip />
        <Legend
          verticalAlign="top"
          title={title}
          payload={data}
          content={renderLegend}
        />
        <Pie
          data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#000" legendType="circle">

          {
            data.map((entry, index) => {
              return (
                <Cell key={entry.name} fill={COLORS[entry.name]}
                />
              );
            })
          }
        </Pie>
      </PieChart>
    );
  }
}

export default PieGraph;