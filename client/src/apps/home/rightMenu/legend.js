import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const LEGEND_LAYERS = {
  result_weekday30: {
    name: "Pracovní týden (30 m úsek)"
  },
  result_weekday2000: {
    name: "Pracovní týden (D1 2 km úsek)"
  },
  result_weekday10000: {
    name: "Pracovní týden (D1 10 km úsek)"
  },
  result_weekend30: {
    name: "Víkend (30 m úsek)"
  },
  result_weekend2000: {
    name: "Víkend (D1 2 km úsek)"
  },
  result_weekend10000: {
    name: "Víkend (D1 10 km úsek)"
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
                  {i === 0 ? `${range} - ${ranges[1]} (${legend.countFeatures[i]})`
                    :
                    `${(ranges[i] + 0.01).toFixed(2)} - ${ranges[i + 1]} (${legend.countFeatures[i]})`}
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
  mainLegend = (name, title, start, end) => {
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
          <div className="mb-20 mt-20">počet nehod* (počet úseků v intervalu)</div>
          {this.props.legend
            .filter((l, i) => i > start && i < end)
            .map((legend, i) => {
              return (this.props.hour === -1 && legend.hour === -1) ||
                (this.props.hour !== -1 && legend.hour !== -1) ?
                this.item(legend)
                :
                null
            })
          }
          <div className="mt-20">*Počet nehod je relativizovaný podle počtu dní (víkend - 2 dny, pracovní týden - 5 dní)</div>
        </Collapse>
      </div>
    );
  }
  render() {
    return (
      <div className="p-20 container-column">
        <div className="big mb-10">Legenda</div>
        {this.mainLegend("weekend", "Víkend", 2, 6)}
        {this.mainLegend("weekday", "Pracovní týden", -1, 3)}
        {
          this.props.gridLegend.ranges && <div className="mb-20">
            <Button
              variant="contained"
              color={`${this.state["grid"] ? "primary" : "default"}`}
              onClick={e => this.toggle("grid")}
              fullWidth={true}
            >
              Grid
          </Button>
            <Collapse in={this.state["grid"]}>
              <div className="mb-20 mt-20">počet nehod* (počet čtverců v intervalu)</div>
              {
                this.gridItem(this.props.gridLegend)
              }
              <div className="mt-20">*Počet nehod celkem (víkend + pracovní týden)</div>
            </Collapse>
          </div>
        }
      </div>
    )
  }
}
