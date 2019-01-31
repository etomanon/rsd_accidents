import React, { Component } from 'react';
import { connect } from "react-redux";

import { modalToggle } from "src/actions/index";


import MainMap from "./home/mainMap";
import RightMenu from "./home/rightMenu";
import ChartModal from "./home/charts/chartModal";

class Home extends Component {
    render() {
        return (
            <div>
                {/* <div className="background-primary text-white">Home</div> */}
                <RightMenu />
                <MainMap
                    map={this.props.map}
                />
                <ChartModal
                    showModal={this.props.map.showModal}
                    modalToggle={this.props.modalToggle}
                    chart={this.props.map.chart}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);