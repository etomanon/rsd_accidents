import React, { Component } from "react";

import Slider from "@material-ui/lab/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      value: -1
    };
  }
  onChange = (event, value) => {
    this.setState({ value });
    this.props.hourSet(value);
  };

  render() {
    return (
      <div className="p-20 container-column overflow-hidden">
        <div className="big mb-20">Menu</div>

        <div className="text-left mb-20 text-center">
          {!(this.state.value === -1)
            ? `Hodina: ${this.state.value}:00 - ${this.state.value + 1}:00`
            : "Celý den"}
        </div>
        <Slider
          min={-1}
          max={23}
          step={1}
          value={this.state.value}
          onChange={this.onChange}
          id="hour-slider"
        />
        <div className="mt-20 text-center">
          <Tooltip title="Pro zobrazenou oblast" placement="left">
            <Button
              id="graph-button"
              variant="contained"
              color="primary"
              onClick={e => {
                this.props.chartGet(this.props.extent);
                this.props.modalToggle();
              }}
              fullWidth={true}
            >
              Vykreslit grafy
            </Button>
          </Tooltip>
        </div>
        <div className="mt-20 text-center">
          <Tooltip title="Součet všech nehod" placement="left">
            <Button
              id="grid-button"
              variant="contained"
              color="primary"
              onClick={e => {
                this.props.gridData(this.props.extent);
              }}
              fullWidth={true}
            >
              Zobraz grid
            </Button>
          </Tooltip>
        </div>
        <div className="mt-20 text-center">
          <Tooltip
            title="Zobrazí jen úseky s nejvyšší nehodovostí"
            placement="left"
          >
            <Button
              id="critical"
              variant="contained"
              color={`${this.props.critical ? "secondary" : "default"}`}
              onClick={e => {
                this.props.criticalToggle();
              }}
              fullWidth={true}
            >
              Jen kritické úseky
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}
