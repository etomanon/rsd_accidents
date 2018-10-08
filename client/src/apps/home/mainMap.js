import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import "ol/ol.css";


export default class MainMap extends Component {
  componentDidMount() {
    new Map({
      target: this.map,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
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