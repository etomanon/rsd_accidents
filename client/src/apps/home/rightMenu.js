import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { layerToggle, layerOpacity, hourSet, legendGet } from "src/actions/index";
import { valuesIn, keysIn } from "lodash";

import Layers from "./rightMenu/layers";
import Menu from "./rightMenu/menu";



class RightMenu extends Component {
    constructor() {
        super();
        this.state = {
            layers: false,
            menu: false
        }
    }
    componentDidMount() {
        this.props.legendGet();
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
    render() {
        return (
            <div className={`right-menu ${valuesIn(this.state).some((v) => v) && "right-menu--active"}`}>
                <div className="right-menu__options container-column">
                    <div
                        onClick={e => this.onToggle("layers")}
                        className={`mt-10 button ${this.state.layers && "button--active"}`}>
                        <i className="fas fa-layer-group"></i>
                    </div>
                    <div
                        onClick={e => this.onToggle("menu")}
                        className={`mt-10 button ${this.state.menu && "button--active"}`}>
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div
                    className={`right-menu__submenu ${this.state.layers && "right-menu__submenu--active"}`}>
                    <Layers
                        layers={this.props.map.layers}
                        layerToggle={this.props.layerToggle}
                        layerOpacity={this.props.layerOpacity}
                    />
                </div>
                <div
                    className={`right-menu__submenu ${this.state.menu && "right-menu__submenu--active"}`}>
                    <Menu
                        hourSet={this.props.hourSet}
                    />
                </div>
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
    return bindActionCreators({ layerToggle, layerOpacity, hourSet, legendGet }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);