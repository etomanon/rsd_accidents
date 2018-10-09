import React, { Component } from "react";
import { valuesIn } from "lodash";

import Layers from "./rightMenu/layers";



export default class RightMenu extends Component {
    constructor() {
        super();
        this.state = {
            layers: false
        }
    }
    onToggle = (key) => {
        this.setState({
            [key]: !this.state[key]
        })
    }
    render() {
        return (
            <div className={`right-menu ${valuesIn(this.state).some((v) => v) && "right-menu--active"}`}>
                <div
                    onClick={e => this.onToggle("layers")}
                    className={`right-menu__icon button ${this.state.layers && "button--active"}`}>
                    <i className="fas fa-layer-group"></i>
                </div>
                <div
                    className={`right-menu__submenu ${this.state.layers && "right-menu__submenu--active"}`}>
                    <Layers />
                </div>
            </div>

        );

    }

}