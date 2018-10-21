import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import LineString from 'ol/geom/LineString';

export default new class Styles {
    constructor() {
        this.important = ["motorway", "motorway_link", "primary", "primary_link", "trunk", "trunk_link"];
        this.hour = -1;
        this.points = this.hour === -1 ? "points_total" : `points_${this.hour}`;
    }
    updateStyle = (hour) => {
        this.hour = hour;
        this.points = this.hour === -1 ? "points_total" : `points_${this.hour}`;
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
    vectorTileOffset = (feature, resolution) => {
        const points = feature.get(this.points);
        const highway = feature.get("highway");
        let geometry = feature.getGeometry();
        if (points !== 0) {
            geometry = this.offsetLine(feature, resolution);
        }
        return new Style({
            geometry: geometry,
            stroke: new Stroke({
                color: this.color(points, highway, resolution),
                lineCap: "square",
                width: this.getWidth(feature, resolution)
            })
        })
    }
    vectorTile = (feature, resolution) => {
        const points = feature.get(this.points);
        const highway = feature.get("highway");
        return new Style({
            stroke: new Stroke({
                color: this.color(points, highway, resolution, true),
                lineCap: "square",
                width: this.getWidth(feature, resolution)
            })
        })
    }
    // resolution 20, 150
    color = (points, highway, resolution, limit) => {
        if (points === 0) {
            // return "#84CA50";
            return "rgba(0, 0, 0, 0)";
        }
        if (points <= 3) {
            return "#eeee00"
            // return "rgba(0, 0, 0, 0)";
        }
        if (points <= 9) {
            return "#F07D02";
        }
        return "#ff0000"
    }

    getWidth = (feature, resolution) => {
        if (resolution > 9) {
            return 2;
        }
        return 4;
    }
}()