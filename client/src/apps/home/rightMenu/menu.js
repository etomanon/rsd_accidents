import React, { Component } from "react";

import Slider from '@material-ui/lab/Slider';

export default class Menu extends Component {
    constructor() {
        super();
        this.state = {
            value: -1
        }
    }
    onChange = (event, value) => {
        this.setState({ value });
        this.props.hourSet(value);
    };

    render() {
        return (
            <div className="mt-20 p-20 container-column">
                <div className="text-left mb-20 text-center">
                    Hodina: {!(this.state.value === -1) ?
                        `${this.state.value}:00 - ${this.state.value + 1}:00`
                        :
                        "Celý den"}
                </div>
                <Slider
                    min={-1}
                    max={23}
                    step={1}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <div className="mt-20">
                    {this.props.legend.map((legend, i) => {
                        return (
                            <div className="mt-10" key={i}>
                                <div>{legend.table}</div>
                                <div>{`${legend.hour === -1 ? "Celý den" : "1 hodina"}`}</div>
                                <div>{legend.ranges.slice(1).join(" - ")}</div>
                                <div>{legend.countFeatures.join(" | ")}</div>
                            </div>
                        );
                    })
                    }

                </div>
            </div>
        );

    }
}