import React, { Component } from "react";

import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

import Layers from "./mainMap/layers";


export default class MainMap extends Component {
  componentDidMount() {
    this.mapEl = new Map({
      target: this.map,
      view: new View({
        center: fromLonLat([16.6068, 49.1951]),
        zoom: 12,
        projection: "EPSG:3857"
      })
    });
    Layers.defaultLayers(this.mapEl);
    Layers.update(this.mapEl, this.props.map);
  }
  componentDidUpdate(prevProps) {
    Layers.update(this.mapEl, this.props.map);
  }
  render() {
    return (
      <div
        className="main-map"
        ref={ref => this.map = ref}>

      </div>
    );
  }
}