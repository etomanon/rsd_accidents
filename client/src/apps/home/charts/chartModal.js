import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { PieChart, Pie, Cell, Legend } from "recharts";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: 'auto'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const COLORS = {
  bus_stop: "#f032e6",
  corridor: "#911eb4",
  cycleway: "#bfef45",
  living_street: "#42d4f4",
  motorway: "#9A6324",
  motorway_link: "#808000",
  platform: "#fabebe",
  primary: "#000075",
  primary_link: "#4363d8",
  raceway: "#e6beff",
  residential: "#f58231",
  secondary: "#3cb44b",
  secondary_link: "#aaffc3",
  service: "#ffd8b1",
  tertiary: "#800000",
  tertiary_link: "#e6194B",
  traffic_island: "#000",
  trunk: "#469990",
  trunk_link: "#5cb7ce",
  unclassified: "#000",
  yes: "#000"
}

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <>
      <div className="mb-10 text-center">Typ (počet nehod, podíl délky typu komunikace na celku)</div>
      <ul className="pie-chart">
        {
          payload
            .filter(entry => entry.value !== 0)
            .map((entry, index) => (
              <li className="pie-chart__item" key={entry.name}>
                <span style={{ background: COLORS[entry.name] }} className="pie-chart__color" />{entry.name} ({entry.value}, {(entry.length_share).toFixed(2)} %)
          </li>
            ))
        }
      </ul>
    </>
  );
}

class ChartModal extends React.Component {
  customTooltipOnYourLine = (e) => {
    if (e.active && e.payload != null && e.payload[0] != null) {
      return (<div className="custom-tooltip">
        <p>{e.payload[0].payload["Column Name"]}</p>
      </div>);
    }
    else {
      return "";
    }
  }
  render() {
    const { classes, showModal, modalToggle, chart } = this.props;
    console.log(chart)
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={showModal}
          onClose={modalToggle}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {chart.length > 0 && <PieChart
              width={500}
              height={400}
            >
              <Legend
                verticalAlign="top"
                payload={chart}
                content={renderLegend}
              />
              <Pie
                data={chart} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#000" legendType="circle">

                {
                  chart.map((entry, index) => {
                    return (
                      <Cell key={entry.name} fill={COLORS[entry.name]}
                      />
                    );
                  })
                }
              </Pie>
            </PieChart>}
          </div>
        </Modal>
      </div>
    );
  }
}

const ChartModalWrapper = withStyles(styles)(ChartModal);

export default ChartModalWrapper;