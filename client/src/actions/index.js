import axios from 'axios';

export const LAYER_REMOVE = 'LAYER_REMOVE';
export const LAYER_ADD = 'LAYER_ADD';

export function layerRemove(layer) {
    return {
        type: LAYER_REMOVE,
        payload: layer
    };
}

export function layerAdd(layer) {
    return {
        type: LAYER_ADD,
        payload: layer
    };
}