import {
  LAYER_TOGGLE,
  LAYER_OPACITY,
  HOUR_SET,
  RESOLUTION_SET,
  LEGEND_GET,
  MODAL_TOGGLE,
  EXTENT_SET,
  CHART_GET,
  GRID_DATA,
  CRITICAL_TOGGLE
} from "../actions";

export default function(
  state = {
    layers: [
      {
        id: "osm",
        name: "OSM",
        opacity: 1,
        show: false,
        zIndex: 1
      },
      {
        id: "mapbox-dark",
        name: "Mapbox Dark",
        opacity: 1,
        show: true,
        zIndex: 2
      },
      {
        id: "weekend",
        name: "Víkend",
        opacity: 1,
        show: false,
        zIndex: 3
      },
      {
        id: "weekday",
        name: "Pracovní týden",
        opacity: 1,
        show: true,
        zIndex: 4
      },
      {
        id: "grid",
        name: "Grid",
        opacity: 0.33,
        show: true,
        zIndex: 5
      }
    ],
    hour: -1,
    resolution: 0,
    extent: {
      0: 0,
      1: 0,
      2: 0,
      3: 0
    },
    legend: [],
    chart: [],
    showModal: false,
    gridData: {
      type: "FeatureCollection",
      features: []
    },
    gridLegend: [],
    isFetching: false,
    // show critical segments only
    critical: false
  },
  action
) {
  switch (action.type) {
    case LEGEND_GET + "_PENDING":
    case CHART_GET + "_PENDING":
    case GRID_DATA + "_PENDING":
      return {
        ...state,
        isFetching: true
      };
    case LAYER_TOGGLE:
      return {
        ...state,
        layers: state.layers.map((layer, i) => {
          if (action.payload === layer.id) {
            layer.show = !layer.show;
            return layer;
          }
          return layer;
        })
      };
    case LAYER_OPACITY:
      return {
        ...state,
        layers: state.layers.map((layer, i) => {
          if (action.payload.id === layer.id) {
            layer.opacity = action.payload.opacity;
            return layer;
          }
          return layer;
        })
      };
    case HOUR_SET:
      return {
        ...state,
        hour: action.payload
      };
    case RESOLUTION_SET:
      return {
        ...state,
        resolution: action.payload
      };
    case EXTENT_SET:
      return {
        ...state,
        extent: action.payload
      };
    case LEGEND_GET + "_FULFILLED":
      return {
        ...state,
        legend: action.payload.data,
        isFetching: false
      };
    case CHART_GET + "_FULFILLED":
      return {
        ...state,
        chart: action.payload.data,
        isFetching: false
      };
    case MODAL_TOGGLE:
      return {
        ...state,
        showModal: !state.showModal
      };

    case GRID_DATA + "_FULFILLED":
      return {
        ...state,
        gridData: action.payload.data.geojson,
        gridLegend: action.payload.data.legend,
        isFetching: false
      };
    case CRITICAL_TOGGLE:
      return {
        ...state,
        critical: !state.critical
      };
    default:
      return state;
  }
}
