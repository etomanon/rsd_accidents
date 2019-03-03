import React, { Component } from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const LEGEND_LAYERS = {
  result_weekday30: {
    name: "Nehodovost na 30 m úseku"
  },
  result_weekday2000: {
    name: "Nehodovost na 2 km úseku"
  },
  result_weekday10000: {
    name: "Nehodovost na 10 km úseku"
  },
  result_weekend30: {
    name: "Nehodovost na 30 m úseku"
  },
  result_weekend2000: {
    name: "Nehodovost na 2 km úseku"
  },
  result_weekend10000: {
    name: "Nehodovost na 10 km úseku"
  },
}
const COLORS = [
  "#eeee00",
  "#F07D02",
  "#ff0000"
]

export default class Legend extends Component {
  constructor() {
    super();
    this.state = {
      weekday: false,
      weekend: false,
      grid: false
    }
  }
  toggle = layer => {
    const value = !this.state[layer];
    this.setState({
      [layer]: value
    });
  }
  item = (legend) => {
    const { ranges } = legend;
    return (
      <div className="mt-10" key={legend.table + legend.hour}>
        <div>{LEGEND_LAYERS[legend.table].name}</div>
        <ul className="legend__list">
          {
            ranges.map((range, i) => {
              return i + 1 !== ranges.length ?
                <li className="legend__item" key={i}>
                  <span style={{ background: COLORS[i] }} className="legend__color" />
                  {i === 0 && `Nízká (${range} - ${ranges[1]} | ${legend.countFeatures[i]})`}
                  {i === 1 && `Střední (${(ranges[i] + 0.01).toFixed(2)} - ${ranges[i + 1]} | ${legend.countFeatures[i]})`}
                  {i === 2 && `Vysoká (${(ranges[i] + 0.01).toFixed(2)} - ${ranges[i + 1]} | ${legend.countFeatures[i]})`}
                </li>
                :
                null
            })
          }
        </ul>
      </div>
    );
  }
  gridItem = legend => {
    const { ranges } = legend;
    return (
      <>
        {
          ranges.map((range, i) => {
            return i + 1 !== ranges.length ?
              <li className="legend__item" key={i}>
                <span style={{ background: COLORS[i] }} className="legend__color legend__color--grid" />
                {i === 0 ? `${range} - ${ranges[1]} (${legend.countFeatures[i]})`
                  :
                  `${(ranges[i] + 0.01).toFixed(2)} - ${ranges[i + 1]} (${legend.countFeatures[i]})`}
              </li>
              :
              null
          })
        }
      </>
    );
  }
  mainLegend = (name, title, hour) => {
    return (
      <div className="mb-20">
        <Button
          variant="contained"
          color={`${this.state[name] ? "primary" : "default"}`}
          onClick={e => this.toggle(name)}
          fullWidth={true}
        >
          {title}
        </Button>
        <Collapse in={this.state[name]}>

          <div className="mb-20 mt-20">Úroveň (
            <Tooltip key={name} title={"Počet nehod je relativizovaný podle počtu dní (víkend - 2 dny, pracovní týden - 5 dní)"} placement="left">
              <span className="action">interval počtu nehod <i className="fas fa-info-circle"></i></span>
            </Tooltip>
            <span> | počet úseků v intervalu)</span>
          </div>
          {this.props.legend
            .filter((l, i) => l.table.includes(name))
            .map((legend, i) => {
              return ((hour === -1 && legend.hour === -1) ||
                (hour !== -1 && legend.hour !== -1)) ?
                this.item(legend, hour)
                :
                null
            })
          }
        </Collapse>
      </div>
    );
  }
  render() {
    const { gridLegend, hour } = this.props;
    return (
      <div className="p-20 container-column">
        <div className="big mb-20">Legenda</div>
        {this.mainLegend("weekend", "Víkend", hour)}
        {this.mainLegend("weekday", "Pracovní týden", hour)}
        {
          gridLegend.ranges && <div className="mb-20">
            <Button
              variant="contained"
              color={`${this.state["grid"] ? "primary" : "default"}`}
              onClick={e => this.toggle("grid")}
              fullWidth={true}
            >
              Grid
          </Button>
            <Collapse in={this.state["grid"]}>
              <div className="mb-20 mt-20">
                <Tooltip title={"Počet nehod celkem (víkend + pracovní týden)"} placement="left">
                  <span className="action">Počet nehod <i className="fas fa-info-circle"></i></span>
                </Tooltip>
                <span> (počet čtverců v intervalu)</span>

              </div>
              {
                this.gridItem(gridLegend)
              }
            </Collapse>
          </div>
        }
      </div>
    )
  }
}
