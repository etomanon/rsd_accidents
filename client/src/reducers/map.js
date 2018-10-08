import { LAYER_REMOVE, LAYER_ADD } from '../actions';

export default function (state = {
    layers: ["osm", "mapbox-dark", "weekend", "weekday"]
}, action) {
    switch (action.type) {
        case LAYER_REMOVE:
            return {
                ...state,
                layers: state.layers.filter((layer, i) => {
                    if (action.payload.data.layer === layer) {
                        return false;
                    }
                    return true;
                })
            }
        case LAYER_ADD:
            return {
                ...state,
                layers: [...state.layers, action.payload.data.layer]
            }
        default:
            return state;
    }
}