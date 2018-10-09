import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { layerToggle, layerOpacity } from "src/actions/index";
import Button from '@material-ui/core/Button';

import LayerSlider from "./layerSlider";

class Layers extends Component {
    render() {
        return (
            <div>
                <div className="container-column p-20 list-mt-20">
                    {this.props.layers.map((layer, i) => {
                        return (
                            <div key={i}>
                                <div className="mb-20">
                                    <Button
                                        variant="contained"
                                        color={`${layer.show ? "primary" : "default"}`}
                                        onClick={e => this.props.layerToggle(layer.id)}
                                        fullWidth={true}
                                    >
                                        {layer.name}
                                    </Button>
                                </div>
                                <LayerSlider
                                    layerId={layer.id}
                                    onOpacity={this.props.layerOpacity}
                                />

                            </div>
                        );
                    })
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ layerToggle, layerOpacity }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        layers: state.map.layers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layers);