import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import LineString from 'ol/geom/LineString';

export default new class Styles {
    constructor() {
        this.important = ["motorway", "motorway_link", "primary", "primary_link", "trunk", "trunk_link"];
        this.hour = -1;
        this.points = this.hour === -1 ? "points_total" : `points_${this.hour}`;
        this.legends = [];
    }
    updateStyle = (stateMap, layersAll) => {
        

        if (this.hour !== stateMap.hour ||
            this.legends.length !== stateMap.legend.length) {
            this.legends = stateMap.legend;
            this.hour = stateMap.hour;
            this.points = this.hour === -1 ? "points_total" : `points_${this.hour}`;
            const hourLegend = (stateMap.hour === -1) ? -1 : 0;

            layersAll.forEach(layer => {
                this.legends.forEach(legend => {
                    if (layer.get("id") === legend.table && legend.hour === hourLegend) {
                        if (legend.length === 30) {
                            layer.setStyle((feature, resolution) => {
                                return this.vectorTile(feature, resolution, legend.ranges);
                            })
                        }
                        else {
                            layer.setStyle((feature, resolution) => {
                                return this.vectorTileOffset(feature, resolution, legend.ranges);
                            })
                        }
                    }
                })
                layer.changed();
            })
        }


    }
    offsetLine = (feature, resolution) => {
        let line = feature.getGeometry();
        let coords = [];
        line.forEachSegment((from, to) => {
            // for each segment calculate a parallel segment with a
            // distance of 3 pixels
            let angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
            let dist = 3 * resolution;
            let newFrom = [
                Math.sin(angle) * dist + from[0],
                -Math.cos(angle) * dist + from[1]
            ];
            let newTo = [
                Math.sin(angle) * dist + to[0],
                -Math.cos(angle) * dist + to[1]
            ];
            coords.push(newFrom);
            coords.push(newTo);
        });

        return new LineString(coords);
    }
    vectorTileOffset = (feature, resolution, ranges) => {
        const points = feature.get(this.points);
        let geometry = feature.getGeometry();
        if (points !== 0) {
            geometry = this.offsetLine(feature, resolution);
        }
        return new Style({
            geometry: geometry,
            stroke: new Stroke({
                color: this.color(points, ranges),
                lineCap: "square",
                width: this.getWidth(resolution)
            })
        })
    }
    vectorTile = (feature, resolution, ranges) => {
        const points = feature.get(this.points);
        return new Style({
            stroke: new Stroke({
                color: this.color(points, ranges),
                lineCap: "square",
                width: this.getWidth(resolution)
            })
        })
    }
    color = (points, ranges) => {
        if (ranges) {
            if (points === 0) {
                return "rgba(0, 0, 0, 0)";
            }
            if (points <= ranges[1]) {
                return "#eeee00";
            }
            if (points <= ranges[2]) {
                return "#F07D02";
            }
            return "#ff0000";
        }
        return "rgba(0, 0, 0, 0)";
    }

    getWidth = (resolution) => {
        if (resolution > 9) {
            return 2;
        }
        return 4;
    }
}()