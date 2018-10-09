import React, { Component } from 'react';
import { connect } from "react-redux";


import MainMap from "./home/mainMap";
import RightMenu from "./home/rightMenu";

class Home extends Component {
    render() {
        return (
            <div>
                {/* <div className="background-primary text-white">Home</div> */}
                <MainMap
                    map={this.props.map}
                />
                <RightMenu />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        map: state.map
    }
}

export default connect(mapStateToProps)(Home);