import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Tooltip from '@material-ui/core/Tooltip';

import {
    layerToggle, layerOpacity, hourSet, legendGet, chartGet, modalToggle,
    gridData
} from "src/actions/index";
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
                title: "Vrstvy",
                icon: "fas fa-layer-group",
                comp: () => <Layers
                    layers={this.props.map.layers}
                    layerToggle={this.props.layerToggle}
                    layerOpacity={this.props.layerOpacity}
                />
            },
            {
                name: "legend",
                title: "Legenda",
                icon: "far fa-map",
                comp: () => <Legend
                    hour={this.props.map.hour}
                    legend={this.props.map.legend}
                    gridLegend={this.props.map.gridLegend}
                />
            },
            {
                name: "menu",
                title: "Menu",
                icon: "fas fa-ellipsis-v",
                comp: () => <Menu
                    hour={this.props.map.hour}
                    hourSet={this.props.hourSet}
                    extent={this.props.map.extent}
                    chartGet={this.props.chartGet}
                    modalToggle={this.props.modalToggle}
                    gridData={this.props.gridData}
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
    resetMenu = () => {
        keysIn(this.state).forEach(key => {
            this.setState({
                [key]: false
            });
        })
    }
    onToggle = (key) => {
        this.resetMenu()
        this.setState({
            [key]: !this.state[key]
        });
    }
    onOpen = key => {
        this.resetMenu()
        this.setState({
            [key]: true
        });
    }
    button = (name, title, icon) => {
        return (
            <Tooltip key={name} title={title} placement="left">
                <div
                    id={name}
                    onClick={e => this.onToggle(name)}
                    className={`mt-10 button button--menu ${this.state[name] && "button--active"}`}>
                    <i className={icon}></i>
                </div>
            </Tooltip>
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
                        this.items.map(item => this.button(item.name, item.title, item.icon))
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
    return bindActionCreators({
        layerToggle, layerOpacity, hourSet, legendGet,
        chartGet, modalToggle, gridData
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(RightMenu);