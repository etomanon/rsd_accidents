import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import OSM from "ol/source/OSM";
import VectorTile from "ol/layer/VectorTile"
import VectorTileSource from "ol/source/VectorTile"
import MVT from "ol/format/MVT";
// import Feature from 'ol/Feature';

import Styles from "./styles";

export default new class Layers {
    constructor() {
        this.removedLayers = [];
    }
    createVectorTile = (title, url, style, zIndex) => {
        return new VectorTile({
            source: new VectorTileSource({
                format: new MVT({
                    // enable access to geometry
                    // featureClass: Feature
                }),
                url: url,
            }),
            style: style,
            zIndex: zIndex,
            id: title,
            show: true
        })
    }
    defaultLayers = (map) => {
        this.defaultLayers = [
            new TileLayer({
                id: "mapbox-dark",
                source: new XYZ({
                    url: "https://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXRvbWFub24iLCJhIjoiY2o4dDYyOXFnMGl6MzJxcDAxcmpuenYxdCJ9.TBlWfbR9wNimqgd8uZcNVQ"
                }),
                zIndex: 2,
                show: true,
            }),
            new TileLayer({
                id: "osm",
                source: new OSM(),
                zIndex: 1,
                show: true,
            }),
            this.createVectorTile(
                'weekday',
                'api/data/weekday/{z}/{x}/{y}',
                Styles.vectorTile,
                3
            ),
            this.createVectorTile(
                'weekend',
                'api/data/weekend/{z}/{x}/{y}',
                Styles.vectorTile,
                4
            )
        ];

        this.defaultLayers.forEach(layer => {
            map.addLayer(layer);
        })
    }

    update = (map, stateMap) => {
        const newLayers = stateMap.layers;
        this.defaultLayers.forEach(layer => {
            newLayers.forEach(newLayer => {
                if (layer.get("id") === newLayer.id) {
                    if(!newLayer.show && layer.get("show")) {
                        map.removeLayer(layer);
                        layer.set("show", false);
                    }
                    if(newLayer.show && !layer.get("show")) {
                        map.addLayer(layer);
                        layer.set("show", true);
                    }
                    layer.setOpacity(newLayer.opacity);
                }
            })
        })

        Styles.updateStyle(stateMap.hour);
        this.defaultLayers.forEach(layer => {
            layer.changed()
        })
    }
}();