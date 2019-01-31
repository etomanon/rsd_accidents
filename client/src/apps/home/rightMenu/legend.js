import React, { Component } from 'react'


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
  render() {
    return (
      <div className="p-20 container-column">
      <div className="big mb-10">Legenda</div>
      <div className="mb-20">počet nehod (počet úseků v intervalu)</div>
        {this.props.legend.map((legend, i) => {
          return (this.props.hour === -1 && legend.hour === -1) ||
            (this.props.hour !== -1 && legend.hour !== -1) ?
            this.item(legend)
            :
            null
        })
        }
      </div>
    )
  }
}
