import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import OSM from "ol/source/OSM";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorTile from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile"
import { Group as LayerGroup, Vector as VectorLayer } from 'ol/layer.js';
import MVT from "ol/format/MVT";
import Feature from 'ol/Feature';
import { isEqual } from "lodash";

import Styles from "./styles";

export default new class Layers {
    createVectorTile = (title, url, style, zIndex, geometry, maxResolution, minResolution) => {
        let format;
        if (geometry) {
            format = new MVT({
                // enable access to geometry
                featureClass: Feature
            });
        }
        else {
            format = new MVT({});
        }
        return new VectorTile({
            source: new VectorTileSource({
                format,
                url,
            }),
            maxResolution,
            minResolution,
            style: style,
            zIndex: zIndex,
            name: title,
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
            new LayerGroup({
                id: 'weekday',
                show: true,
                layers: [
                    this.createVectorTile(
                        'result_weekday30',
                        'api/data/weekday/{z}/{x}/{y}',
                        Styles.vectorTile,
                        3,
                        false,
                        10,
                        undefined
                    ),
                    this.createVectorTile(
                        'result_weekday2000',
                        'api/data/weekday2000/{z}/{x}/{y}',
                        Styles.vectorTileOffset,
                        3,
                        true,
                        150,
                        undefined,
                    ),
                    this.createVectorTile(
                        'result_weekday10000',
                        'api/data/weekday10000/{z}/{x}/{y}',
                        Styles.vectorTileOffset,
                        3,
                        true,
                        undefined,
                        150,
                    ),
                ]
            }),
            new LayerGroup({
                id: 'weekend',
                show: true,
                layers: [
                    this.createVectorTile(
                        'result_weekend30',
                        'api/data/weekend/{z}/{x}/{y}',
                        Styles.vectorTile,
                        4,
                        false,
                        10,
                        undefined
                    ),
                    this.createVectorTile(
                        'result_weekend2000',
                        'api/data/weekend2000/{z}/{x}/{y}',
                        Styles.vectorTileOffset,
                        4,
                        true,
                        150,
                        undefined
                    ),
                    this.createVectorTile(
                        'result_weekend10000',
                        'api/data/weekend10000/{z}/{x}/{y}',
                        Styles.vectorTileOffset,
                        4,
                        true,
                        undefined,
                        150
                    ),
                ]
            }),
            new VectorLayer({
                id: "grid",
                source: new VectorSource({}),
                style: null,
                zIndex: 5,
                show: true
            })
        ];

        this.defaultLayers.forEach(layer => {
            map.addLayer(layer);
        })
    }

    update = (map, stateMap, prevMap) => {
        const newLayers = stateMap.layers;
        this.defaultLayers.forEach(layer => {
            newLayers.forEach(newLayer => {
                if (layer.get("id") === newLayer.id) {
                    layer.setOpacity(newLayer.opacity);
                    if (!newLayer.show && layer.get("show")) {
                        map.removeLayer(layer);
                        layer.set("show", false);
                    }
                    if (newLayer.show && !layer.get("show")) {
                        map.addLayer(layer);
                        layer.set("show", true);
                    }

                }
            })
        })

        const layersAll = [];
        this.defaultLayers.forEach(layer => {
            if (layer instanceof LayerGroup) {
                layer.getLayers().forEach((sublayer) => {
                    layersAll.push(sublayer);
                });
                return;
            }
            layersAll.push(layer);
        })
        Styles.updateStyle(stateMap, layersAll);
        let prevData = prevMap && prevMap.gridData;
        if (!isEqual(stateMap.gridData, prevData)) {
            console.log(this.defaultLayers)
            const gridLayer = this.defaultLayers.find(l => l.get("id") === "grid");
            const source = gridLayer.getSource();
            source.clear(true);
            const newData = (new GeoJSON()).readFeatures(stateMap.gridData);
            source.addFeatures(newData);
        }
    }
}();