import React, { Component } from "react";
import Slider from '@material-ui/lab/Slider';

class LayerSlider extends Component {
    constructor() {
        super();
        this.state = {
            value: 1
        }
    }
    componentDidMount() {
        this.setState({
            value: this.props.initOpacity
        })
    }
    onChange = (event, value) => {
        this.setState({ value });
        this.props.onOpacity(this.props.layerId, value);
    };

    render() {
        return (
            <Slider
                max={1}
                value={this.state.value}
                onChange={this.onChange}
            />
        );

    }
}

export default LayerSlider;