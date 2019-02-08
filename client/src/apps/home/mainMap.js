import React, { Component } from "react";
import ResizeObserver from 'resize-observer-polyfill';

import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from 'ol/control';
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
        zoom: 15,
        projection: "EPSG:3857"
      })
    });
    Layers.defaultLayers(this.mapEl);
    Events.init(this.mapEl, this.props.map);

    Layers.update(this.mapEl, this.props.map);
    const updateMapSize = (entries, observer) => {
      this.mapEl.updateSize();
    }
    this.observer = new ResizeObserver(updateMapSize);
    this.observer.observe(this.map);
  }
  componentDidUpdate(prevProps) {
    Layers.update(this.mapEl, this.props.map, prevProps.map);
    Events.update(this.props.map);
  }
  componentWillUnmount() {
    this.observer.unobserve(this.map);
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