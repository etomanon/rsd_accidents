import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import LayerSlider from "./layerSlider";

export default class Layers extends Component {
    render() {
        return (
            <div>
                <div className="container-column p-20 list-mt-20">
                <div className="big">Vrstvy</div>
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
                                    initOpacity={layer.opacity}
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