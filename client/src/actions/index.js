import axios from 'axios';

export const LAYER_TOGGLE = 'LAYER_TOGGLE';
export const LAYER_OPACITY = 'LAYER_OPACITY';

export function layerToggle(layerId) {
    return {
        type: LAYER_TOGGLE,
        payload: layerId
    };
}


export function layerOpacity(layerId, opacity) {
    return {
        type: LAYER_OPACITY,
        payload: {
            id: layerId,
            opacity
        }
    };
}