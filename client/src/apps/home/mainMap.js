import React, { Component } from "react";

import Map from "ol/Map";
import View from "ol/View";
import {defaults as defaultControls, ScaleLine} from 'ol/control';
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

import Layers from "./mainMap/layers";
import Events from "./mainMap/events";


export default class MainMap extends Component {
  componentDidMount() {
    this.mapEl = new Map({
      controls: defaultControls({
        attributionOptions: {
          collapsible: false
        }
      }).extend([
        new ScaleLine()
      ]),
      target: this.map,
      view: new View({
        center: fromLonLat([16.6068, 49.1951]),
        zoom: 14,
        projection: "EPSG:3857"
      })
    });
    Layers.defaultLayers(this.mapEl);
    Events.init(this.mapEl);

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