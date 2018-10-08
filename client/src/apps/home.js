import React, { Component } from 'react';

import MainMap from "./home/mainMap";

class Home extends Component {
    render() {
        return (
            <div>
                <div className="background-primary text-white">Home</div>
                <MainMap/>
            </div>
        )
    }
}

export default Home;