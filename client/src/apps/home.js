import React, { Component } from 'react';
import { connect } from "react-redux";

import { modalToggle } from "src/actions/index";

import Loader from "../components/loader";
import MainMap from "./home/mainMap";
import RightMenu from "./home/rightMenu";
import ChartModal from "./home/charts/chartModal";
import JoyRide from '../main/joyRide';

class Home extends Component {
    constructor(props) {
        super(props);
        this.rightMenuRef = React.createRef();
    }
    render() {
        return (
            <div>
                {this.props.visited !== "true" && <JoyRide rightMenuRef={this.rightMenuRef} />}
                <RightMenu ref={this.rightMenuRef} />
                <MainMap
                    map={this.props.map}
                />
                <ChartModal
                    showModal={this.props.map.showModal}
                    modalToggle={this.props.modalToggle}
                    chart={this.props.map.chart}
                />
                <Loader display={this.props.map.isFetching} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}

const mapDispatchToProps = {
    modalToggle
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Home);