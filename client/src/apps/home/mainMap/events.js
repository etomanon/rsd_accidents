import { store } from "src/index";
import { resolutionSet } from "src/actions/index";

export default new class Events {
    init = (map) => {
        this.resolution = 0;
        map.on('moveend', this.onMoveEnd);
    }
    onMoveEnd = (e) => {
        const map = e.map;
        const resolution = map.getView().getResolution();
        if (resolution !== this.resolution) {
            this.resolution = resolution;
            store.dispatch(resolutionSet(resolution));
        }
    }
}();