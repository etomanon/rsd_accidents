import { LAYER_TOGGLE, LAYER_OPACITY } from '../actions';

export default function (state = {
    layers: [{
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
        zIndex: 2,
    },
    {
        id: "weekend",
        name: "Víkend",
        opacity: 1,
        show: true,
        zIndex: 3
    },
    {
        id: "weekday",
        name: "Pracovní týden",
        opacity: 1,
        show: true,
        zIndex: 4
    }]
}, action) {
    switch (action.type) {
        case LAYER_TOGGLE:
            return {
                ...state,
                layers: state.layers.map((layer, i) => {
                    if (action.payload === layer.id) {
                        layer.show = !layer.show;
                        return layer;
                    }
                    return layer
                })
            }
        case LAYER_OPACITY:
            return {
                ...state,
                layers: state.layers.map((layer, i) => {
                    if (action.payload.id === layer.id) {
                        layer.opacity = action.payload.opacity;
                        return layer;
                    }
                    return layer
                })
            }
        default:
            return state;
    }
}