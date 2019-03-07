import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

const geojson = {
  type: "FeatureCollection",
  name: "testing",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::3857" } },
  features: [
    {
      type: "Feature",
      properties: { testing: true },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [1847148.561653962824494, 6314993.188522133976221],
            [1845443.060460350709036, 6314109.385382589884102],
            [1845290.186403777683154, 6313282.910014257766306],
            [1846145.32565771904774, 6311615.62733478564769],
            [1848471.877706149825826, 6312547.203617011196911],
            [1848032.364793509943411, 6313526.553041918203235],
            [1847148.561653962824494, 6314993.188522133976221]
          ]
        ]
      }
    }
  ]
};

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojson),
  projection: "EPSG:4326"
});

export default new VectorLayer({
  id: "test",
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: "#303F9F",
      width: 3
    }),
    fill: new Fill({
      color: "rgba(0, 0, 0, 0)"
    })
  }),
  zIndex: 2,
  show: true
});
