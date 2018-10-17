// import axios from 'axios';

export const LAYER_TOGGLE = 'LAYER_TOGGLE';
export const LAYER_OPACITY = 'LAYER_OPACITY';
export const HOUR_SET = 'HOUR_SET';
export const RESOLUTION_SET = 'RESOLUTION_SET';

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

export function hourSet(hour) {
    return {
        type: HOUR_SET,
        payload: hour
    }
}

export function resolutionSet(resolution) {
    return {
        type: RESOLUTION_SET,
        payload: resolution
    }
}