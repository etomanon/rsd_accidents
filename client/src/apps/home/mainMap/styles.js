import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";

export default new class Styles {
    constructor() {
        this.important = ["motorway", "motorway_link", "primary", "primary_link", "trunk", "trunk_link"];
    }
    vectorTile = (feature, resolution) => {
        if (feature.get("points_total") === 0) {
            return new Style({
                stroke: new Stroke({
                    color: "rgba(0, 255, 0, 0)",
                })
            })
        }
        return new Style({
            stroke: new Stroke({
                color: "rgba(0, 255, 0, 1)",
                width: this.getWidth(resolution)
            })
        })
    }

    color = (points, highway, resolution) => {
        if (this.important.indexOf(highway) === -1 && resolution > 20) {
            return "rgba(0, 0, 0, 0)";
        }
        if (points === 0) {
            // return "#84CA50";
            return "rgba(0, 0, 0, 0)";
        }
        else if (points <= 3) {
            return "#eeee00"
            // return "rgba(0, 0, 0, 0)";
        }
        else if (points <= 9) {
            return "#F07D02";
        }
        return "#ff0000"
    }

    getWidth = (resolution) => {
        if (resolution > 20) {
            return 2;
        }
        return 4;
    }
}()