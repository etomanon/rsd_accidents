import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { layerToggle, layerOpacity, hourSet, legendGet, chartGet, modalToggle } from "src/actions/index";
import { valuesIn, keysIn } from "lodash";

import Layers from "./rightMenu/layers";
import Menu from "./rightMenu/menu";
import Legend from "./rightMenu/legend";


class RightMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.items = [
            {
                name: "layers",
                icon: "fas fa-layer-group",
                comp: () => <Layers
                    layers={this.props.map.layers}
                    layerToggle={this.props.layerToggle}
                    layerOpacity={this.props.layerOpacity}
                />
            },
            {
                name: "menu",
                icon: "fas fa-ellipsis-v",
                comp: () => <Menu
                    hour={this.props.map.hour}
                    hourSet={this.props.hourSet}
                    extent={this.props.map.extent}
                    chartGet={this.props.chartGet}
                    modalToggle={this.props.modalToggle}
                />
            },
            {
                name: "legend",
                icon: "far fa-map",
                comp: () => <Legend
                    hour={this.props.map.hour}
                    legend={this.props.map.legend}
                />
            }
        ];
    }
    componentDidMount() {
        this.props.legendGet();
        this.items.forEach(item => {
            const key = item.name;
            this.setState({
                [key]: false
            });
        })
    }
    onToggle = (key) => {
        keysIn(this.state).forEach(key => {
            this.setState({
                [key]: false
            });
        })
        this.setState({
            [key]: !this.state[key]
        })
    }
    button = (name, icon) => {
        return (
            <div
                key={name}
                onClick={e => this.onToggle(name)}
                className={`mt-10 button ${this.state[name] && "button--active"}`}>
                <i className={icon}></i>
            </div>
        );
    }
    submenu = (name, comp) => {
        return (
            <div
                key={name}
                className={`right-menu__submenu ${this.state[name] && "right-menu__submenu--active"}`}>
                {comp()}
            </div>
        );
    }
    render() {
        return (
            <div className={`right-menu ${valuesIn(this.state).some((v) => v) && "right-menu--active"}`}>
                <div className="right-menu__options container-column">
                    {
                        this.items.map(item => this.button(item.name, item.icon))
                    }
                </div>
                {
                    this.items.map(item => this.submenu(item.name, item.comp))
                }
            </div>

        );

    }

}

const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ layerToggle, layerOpacity, hourSet, legendGet, chartGet, modalToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);