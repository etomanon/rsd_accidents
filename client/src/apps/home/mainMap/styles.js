import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import LineString from "ol/geom/LineString";
import { isEqual } from "lodash";

export default new class Styles {
  constructor() {
    this.important = [
      "motorway",
      "motorway_link",
      "primary",
      "primary_link",
      "trunk",
      "trunk_link"
    ];
    this.hour = -1;
    this.points = this.hour === -1 ? "points_total" : `points_${this.hour}`;
    this.legends = [];
    this.gridLegend = [];
    this.critical = false;
  }
  updateStyle = (stateMap, layersAll) => {
    if (
      this.hour !== stateMap.hour ||
      this.legends.length !== stateMap.legend.length ||
      this.critical !== stateMap.critical
    ) {
      this.legends = stateMap.legend;
      this.hour = stateMap.hour;
      this.points = this.hour === -1 ? "points_total" : `points_${this.hour}`;
      const hourLegend = stateMap.hour === -1 ? -1 : 0;
      this.critical = stateMap.critical;

      layersAll.forEach(layer => {
        this.legends.forEach(legend => {
          if (layer.get("id") === legend.table && legend.hour === hourLegend) {
            if (legend.length === 30) {
              layer.setStyle((feature, resolution) => {
                return this.vectorTile(
                  feature,
                  resolution,
                  legend.ranges,
                  this.critical
                );
              });
            } else {
              layer.setStyle((feature, resolution) => {
                return this.vectorTileOffset(
                  feature,
                  resolution,
                  legend.ranges,
                  this.critical
                );
              });
            }
          }
        });
        layer.changed();
      });
    }
    if (
      !isEqual(this.gridLegend, stateMap.gridLegend) ||
      stateMap.critical !== this.critical
    ) {
      this.critical = stateMap.critical;
      this.gridLegend = stateMap.gridLegend;
      const gridLayer = layersAll.find(l => l.get("id") === "grid");
      gridLayer.setStyle((feature, resolution) => {
        return this.grid(feature, resolution, this.gridLegend, this.critical);
      });
    }
  };
  offsetLine = (geometry, resolution) => {
    let line = geometry;
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
  };
  vectorTileOffset = (feature, resolution, ranges, critical) => {
    const points = feature.get(this.points);
    let geometry = feature.getGeometry();
    if (points !== 0) {
      if (geometry.getLength() > 2001) geometry = geometry.simplify(11000);
      geometry = this.offsetLine(geometry, resolution);
    }
    return new Style({
      geometry: geometry,
      stroke: new Stroke({
        color: this.color(points, ranges, critical),
        lineCap: "square",
        width: this.getWidth(resolution)
      })
    });
  };
  vectorTile = (feature, resolution, ranges, critical) => {
    const points = feature.get(this.points);
    return new Style({
      stroke: new Stroke({
        color: this.color(points, ranges, critical),
        lineCap: "square",
        width: this.getWidth(resolution)
      })
    });
  };
  color = (points, ranges, critical) => {
    if (ranges) {
      if (points === 0) {
        return "rgba(0, 0, 0, 0)";
      }
      if (points <= ranges[1] && !critical) {
        return "#eeee00";
      }
      if (points <= ranges[2] && !critical) {
        return "#F07D02";
      }
      if (points > ranges[2]) {
        return "#ff0000";
      }
      return "rgba(0, 0, 0, 0)";
    }
    return "rgba(0, 0, 0, 0)";
  };

  getWidth = resolution => {
    if (resolution > 9) {
      return 2;
    }
    return 4;
  };

  grid = (feature, resolution, gridLegend, critical) => {
    const points = feature.get("points");
    if (points <= gridLegend.ranges[2] && critical) return;
    return new Style({
      stroke: new Stroke({
        color: "#000",
        width: 2
      }),
      fill: new Fill({
        color: this.color(points, gridLegend.ranges, critical)
      })
    });
  };
}();
